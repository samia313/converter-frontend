#!/bin/bash

echo "═══════════════════════════════════════════════════════════════"
echo "           PDFilio API Testing Suite"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo "Starting dev server..."
  cd /vercel/share/v0-project
  pnpm run dev > /tmp/dev.log 2>&1 &
  DEV_PID=$!
  echo "Waiting for server to start..."
  sleep 20
fi

# Create test files
echo "Creating test files..."
mkdir -p /tmp/test-files

# Create test PDF
printf '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000010 00000 n\n0000000052 00000 n\n0000000102 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n149\n%%%%EOF' > /tmp/test-files/test.pdf

echo "test content" > /tmp/test-files/test.txt

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "                      TEST RESULTS"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Arrays of tools to test
PDF_TOOLS=(
  "compress-pdf"
  "merge-pdf"
  "split-pdf"
  "rotate-pdf"
  "crop-pdf"
  "remove-pages"
)

CONVERSION_TOOLS=(
  "pdf-to-jpg"
  "pdf-to-png"
  "pdf-to-excel"
  "pdf-to-word"
)

AI_TOOLS=(
  "ai-summary"
  "ocr"
)

# Test counters
total=0
passed=0
failed=0

test_api() {
  local tool=$1
  local file=$2
  local description=$3

  total=$((total + 1))

  echo -n "Testing $description... "

  response=$(curl -s -w "\n%{http_code}" -o /tmp/test-files/out_$tool \
    -X POST -F "file=@$file" \
    "http://localhost:3000/api/convert/$tool" 2>&1)

  http_code=$(echo "$response" | tail -n 1)
  
  if [ "$http_code" = "200" ] && [ -s "/tmp/test-files/out_$tool" ]; then
    output_size=$(stat -c%s "/tmp/test-files/out_$tool" 2>/dev/null || stat -f%z "/tmp/test-files/out_$tool" 2>/dev/null)
    echo "✓ (HTTP $http_code, Size: $output_size bytes)"
    passed=$((passed + 1))
  else
    echo "✗ (HTTP $http_code)"
    failed=$((failed + 1))
  fi
}

# Test PDF Tools
echo "📄 PDF TOOLS (6 tests)"
echo "─────────────────────────────────────────────────"
for tool in "${PDF_TOOLS[@]}"; do
  test_api "$tool" "/tmp/test-files/test.pdf" "$tool"
done

echo ""
echo "🔄 CONVERSION TOOLS (4 tests)"
echo "─────────────────────────────────────────────────"
for tool in "${CONVERSION_TOOLS[@]}"; do
  test_api "$tool" "/tmp/test-files/test.pdf" "$tool"
done

echo ""
echo "🤖 AI TOOLS (2 tests)"
echo "─────────────────────────────────────────────────"
for tool in "${AI_TOOLS[@]}"; do
  test_api "$tool" "/tmp/test-files/test.pdf" "$tool"
done

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "                      SUMMARY"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Total Tests:   $total"
echo "Passed:        $passed ✓"
echo "Failed:        $failed ✗"
pass_rate=$((passed * 100 / total))
echo "Pass Rate:     $pass_rate%"
echo ""

if [ $failed -eq 0 ]; then
  echo "🎉 ALL TESTS PASSED!"
else
  echo "⚠️  Some tests failed. Check the output above."
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"

# Cleanup
rm -f /tmp/test-files/out_*
