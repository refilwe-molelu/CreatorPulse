CreatorPulse 🚀

AI-powered content generation, analytics, and smart scheduling for creators and technical writers.

CreatorPulse is an all-in-one content workflow platform that combines AI content generation with creator analytics and intelligent content scheduling.

It helps creators go from analytics → ideas → content → scheduling → publishing in one workspace.

✨ Features
🤖 AI Content Generator

Generate platform-ready content using AI.

🎬 Short-form video scripts

📝 SEO blog posts

📧 Newsletter emails

📱 Social media captions

💻 Technical tutorials

🎯 Hooks and calls-to-action

🔄 Cross-platform content formatting

Content can be customized by platform, tone, audience, topic, and format.

📊 Creator Analytics

Upload analytics exports from platforms such as TikTok, Instagram, and YouTube.

CreatorPulse analyzes historical performance to identify:

Optimal posting times

High-performing content categories

Recommended video durations

Engagement trends

Reach multipliers

Audience activity patterns

Golden posting windows

📅 Smart Content Calendar

Plan your entire content pipeline with an interactive calendar.

Content moves through:

Idea → Scripted → Scheduled → Published


The calendar includes:

Golden Window heatmaps

Scheduling

Content status tracking

Platform organization

Drag-and-drop planning

Publishing workflow management

📚 Content Library

Store and manage generated content in one searchable workspace.

Search

Filtering

Platform categorization

Content status

Editing

One-click scheduling

Cross-platform formatting

🧠 Architecture
                     ┌──────────────────┐
                     │  Creator Data    │
                     │ TikTok / IG / YT │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ Analytics Engine │
                     └────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │ Predictive Engine │
                    └─────────┬─────────┘
                              │
                              ▼
┌──────────────┐      ┌─────────────────┐
│ Creator Idea │ ───► │  AI Generator   │
└──────────────┘      └────────┬────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │ Content Library  │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ Smart Calendar   │
                     └────────┬─────────┘
                              │
                              ▼
                         📈 Published

🛠️ Tech Stack
Layer	Technology
Frontend	React
Styling	Tailwind CSS
Icons	Lucide Icons
Calendar	FullCalendar UI patterns
State	React Hooks
Local Storage	LocalStorage
Database Ready	Supabase
AI	OpenAI / Anthropic / Google Gemini
Analytics	Custom client-side data processing
📁 Project Structure
creatorpulse/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── analytics/
│   │   ├── calendar/
│   │   ├── generator/
│   │   ├── library/
│   │   └── ui/
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Analytics.jsx
│   │   ├── Generator.jsx
│   │   ├── Calendar.jsx
│   │   └── Library.jsx
│   │
│   ├── services/
│   │   ├── ai/
│   │   ├── analytics/
│   │   └── storage/
│   │
│   ├── hooks/
│   ├── utils/
│   ├── data/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env.local
├── package.json
├── tailwind.config.js
└── README.md

🚀 Getting Started
Prerequisites

Node.js 18+

npm or Yarn

An API key for your selected AI provider

1. Clone the repository
git clone https://github.com/your-username/creatorpulse.git
cd creatorpulse

2. Install dependencies
npm install

3. Configure environment variables

Create a .env.local file:

VITE_AI_API_KEY=your_api_key_here


Note: Do not commit .env.local or expose private API keys in a production client-side application.

4. Start the development server
npm run dev

📖 Usage
Analytics

Go to Analytics and upload a supported CSV export or use the sample dataset.

CreatorPulse analyzes the data to generate insights such as:

Best Posting Time
Tuesday · 18:00

Top Content Category
Educational

Recommended Video Duration
30–45 seconds

Historical Reach Multiplier
+24%


These recommendations are based on historical data and should be treated as estimates rather than guarantees.

Content Generation

Open Generator and select:

Platform
   ↓
Content Type
   ↓
Topic
   ↓
Tone
   ↓
Audience
   ↓
Generate


The AI generates content optimized for the selected format and platform.

Scheduling

Move generated content into the Calendar and schedule it around your preferred publishing windows.

Content Library

All generated content can be stored, searched, filtered, edited, and scheduled from the Library.

📊 Analytics Engine

CreatorPulse can process metrics including:

Views
Likes
Comments
Shares
Saves
Watch Time
Engagement Rate
Posting Time
Video Duration
Content Category


Example:

const insights = analyzeContentPerformance(data);

console.log(insights);


Example result:

{
  bestPostingHour: 18,
  bestDay: "Tuesday",
  idealVideoDuration: {
    min: 30,
    max: 45
  },
  topContentBucket: "Educational",
  averageEngagementRate: 7.4
}

🔌 AI Providers

CreatorPulse is designed around an AI abstraction layer so different providers can be integrated without changing the rest of the application.

                 ┌─────────────────┐
                 │ CreatorPulse AI │
                 │     Client      │
                 └────────┬────────┘
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
          OpenAI      Anthropic      Gemini

💾 Persistence

The initial application can use browser storage:

React State
     ↓
LocalStorage


The architecture is designed to support a future backend:

React
  ↓
API
  ↓
Supabase
  ↓
PostgreSQL

🗺️ Roadmap
Core

 Content generator

 Analytics workflow

 Smart calendar

 Content library

 Golden Window concept

Analytics

 Advanced engagement analysis

 Audience segmentation

 Trend detection

 Performance forecasting

 Automated content recommendations

Automation

 Social platform integrations

 Automated publishing

 Cross-platform scheduling

 Automatic content repurposing

 Performance notifications

Collaboration

 Creator workspaces

 Team members

 Content approvals

 Roles and permissions

 Client collaboration

🤝 Contributing

Contributions are welcome.

Fork the repository

Create a feature branch

git checkout -b feature/my-feature


Commit your changes

git commit -m "Add my feature"


Push the branch

git push origin feature/my-feature


Open a Pull Request

🐛 Issues

Found a bug or have a feature request?

Please open an issue and include:

Description of the problem

Steps to reproduce

Expected behavior

Actual behavior

Screenshots, if applicable

🔐 Security

Please do not commit:

.env
.env.local
API keys
Access tokens
Private credentials


For production deployments, sensitive AI credentials should be handled server-side rather than exposed in browser code.

📄 License

This project is licensed under the MIT License.

See LICENSE for more information.

🌟 Vision

CreatorPulse is designed to bring the modern creator workflow into a single platform:

        ANALYZE
           ↓
        DISCOVER
           ↓
         CREATE
           ↓
        OPTIMIZE
           ↓
        SCHEDULE
           ↓
        PUBLISH
           ↓
        MEASURE
           ↓
         REPEAT


CreatorPulse — Turn your data into content. Turn your content into momentum. 🚀
