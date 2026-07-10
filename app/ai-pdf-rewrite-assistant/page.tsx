import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Rewrite Assistant - Intelligent Writing Help | ConvertHub',
  description: 'AI assistant for PDF rewriting. Intelligent suggestions and writing support.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Rewrite Assistant"
      toolSlug="ai-pdf-rewrite-assistant"
      description="Intelligent AI assistant for PDF rewriting. Personalized suggestions and writing support throughout."
      mainContent={`Personal writing assistant. AI provides intelligent suggestions. Learn as you rewrite. Improve writing skills continuously.

Assistant Support:
Suggestions throughout process. Explanations provided. Learning focused. Skill development oriented. Supportive guidance.

Your Writing Partner:
Doesn&apos;t replace—enhances. Improves skills. Provides suggestions. Supports your writing journey. Long-term improvement.`}
      useCase={{
        'Writing skill development': 'Learning support',
        'Personalized suggestions': 'Custom guidance',
        'Writing improvement': 'Skill enhancement',
        'Educational support': 'Learning tool',
        'Continuous improvement': 'Progressive learning',
        'Writing confidence': 'Supportive coaching',
        'Personalized feedback': 'Individual guidance',
        'Professional development': 'Career improvement',
      }}
      testimonials={{
        'Sarah Anderson': 'Writing Student - Personal assistant approach helps me improve writing continuously. Suggestions are educational.',
        'Thomas Green': 'Professional Writer - AI suggestions improve my work. Learning from each rewrite. Continuous improvement.',
      }}
      features={{
        'Personalized suggestions': 'Individual guidance',
        'Explanations provided': 'Learning support',
        'Improvement tracking': 'Progress monitoring',
        'Writing support': 'Coaching approach',
        'Skill development': 'Learning focused',
        'Confidence building': 'Supportive tone',
        'Continuous learning': 'Progressive improvement',
        'Professional guidance': 'Expert suggestions',
      }}
      benefits={{
        'Skill improvement': 'Continuous learning',
        'Better writing': 'Progressive enhancement',
        'Confidence increased': 'Supportive coaching',
        'Learning focused': 'Educational approach',
        'Personal guidance': 'Individualized support',
        'Professional development': 'Career growth',
        'Long-term improvement': 'Continuous growth',
        'Expert support': 'Quality guidance',
      }}
      faqs={{
        'Educational?': 'Yes. Personalized learning and skill development focused.',
        'Suggestions explained?': 'Yes. All suggestions explained for learning purposes.',
        'Long-term improvement?': 'Yes. Track progress and continuously improve writing.',
      }}
      relatedTools={[
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'Rewrite PDF Text', slug: 'rewrite-pdf-text' },
      ]}
      primaryKeyword="ai pdf rewrite assistant"
      secondaryKeywords={['writing assistant', 'personal coaching']}
    />
  );
}
