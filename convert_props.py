#!/usr/bin/env python3
import os
import re
import glob

def convert_benefits_object_to_array(content):
    """Convert benefits={{ ... }} to benefits={[ ... ]}"""
    pattern = r'benefits=\{\{\s*([\s\S]*?)\s*\}\}'
    
    def replace_func(match):
        inner = match.group(1)
        # Extract all key-value pairs
        pairs = re.findall(r"'([^']+)':\s*'([^']*)'", inner)
        if pairs:
            # Keep only keys for array format
            items = [f"'{key}'" for key, _ in pairs]
            array_str = "{\n        " + ",\n        ".join(items) + ",\n      ]}"
            return f"benefits={{{array_str}"
        return match.group(0)
    
    return re.sub(pattern, replace_func, content)

def convert_features_object_to_array(content):
    """Convert features={{ ... }} to features={[ ... ]}"""
    pattern = r'features=\{\{\s*([\s\S]*?)\s*\}\}'
    
    def replace_func(match):
        inner = match.group(1)
        # Extract all key-value pairs
        pairs = re.findall(r"'([^']+)':\s*'([^']*)'", inner)
        if pairs:
            # Keep only keys for array format
            items = [f"'{key}'" for key, _ in pairs]
            array_str = "{\n        " + ",\n        ".join(items) + ",\n      ]}"
            return f"features={{{array_str}"
        return match.group(0)
    
    return re.sub(pattern, replace_func, content)

def convert_use_case_object_to_string(content):
    """Convert useCase={{ ... }} to useCase={`...`}"""
    pattern = r"useCase=\{\{([^}]*(?:\}(?!\})[^}]*)*)\}\}"
    
    def replace_func(match):
        inner = match.group(1)
        # Extract all keys
        keys = re.findall(r"'([^']+)':", inner)
        if keys:
            string_val = "\n".join(keys)
            return f"useCase={{`{string_val}`}}"
        return match.group(0)
    
    return re.sub(pattern, replace_func, content, flags=re.DOTALL)

def convert_faqs_object_to_array(content):
    """Convert faqs={{ ... }} to faqs={[ ... ]}"""
    pattern = r"faqs=\{\{\s*([\s\S]*?)\s*\}\}"
    
    def replace_func(match):
        inner = match.group(1)
        # Extract all question-answer pairs
        pairs = re.findall(r"'([^']+)':\s*'([^']*)'", inner)
        if pairs:
            items = []
            for q, a in pairs:
                items.append(f"{{\n          q: '{q}',\n          a: '{a}',\n        }}")
            array_str = "[\n        " + ",\n        ".join(items) + ",\n      ]"
            return f"faqs={{{array_str}}}"
        return match.group(0)
    
    return re.sub(pattern, replace_func, content, flags=re.DOTALL)

def convert_testimonials_object_to_array(content):
    """Convert testimonials={{ ... }} to testimonials={[ ... ]}"""
    pattern = r"testimonials=\{\{([^}]*(?:\}(?!\})[^}]*)*)\}\}"
    
    def replace_func(match):
        inner = match.group(1)
        # Look for name/role pattern
        names = re.findall(r"'([^']+)':\s*'([^']*)(?:Manager|Director|Professor|Doctor|Owner|Consultant)'", inner)
        if not names:
            # Try different pattern
            names = re.findall(r"'([^']+)':\s*'([^']*)'", inner)
        
        if names:
            items = []
            for i, (name, text) in enumerate(names):
                # Try to extract role from text or use generic role
                role = "User"
                if " - " in text:
                    role = text.split(" - ")[0]
                    text = text.split(" - ", 1)[1]
                
                items.append(f"{{\n          name: '{name}',\n          role: '{role}',\n          text: '{text}',\n        }}")
            
            array_str = "[\n        " + ",\n        ".join(items) + ",\n      ]"
            return f"testimonials={{{array_str}}}"
        return match.group(0)
    
    return re.sub(pattern, replace_func, content, flags=re.DOTALL)

# Process all files
app_dir = "/vercel/share/v0-project/app"
files = glob.glob(f"{app_dir}/**/page.tsx", recursive=True)

print(f"Processing {len(files)} files...\n")

for file_path in sorted(files):
    with open(file_path, 'r') as f:
        content = f.read()
    
    original = content
    
    # Apply conversions
    content = convert_benefits_object_to_array(content)
    content = convert_features_object_to_array(content)
    content = convert_faqs_object_to_array(content)
    
    if content != original:
        with open(file_path, 'w') as f:
            f.write(content)
        
        rel_path = file_path.replace(app_dir + "/", "").replace("/page.tsx", "")
        print(f"✅ Fixed: {rel_path}")

print("\n✅ All files processed!")
