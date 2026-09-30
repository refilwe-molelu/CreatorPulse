import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  FileText, 
  Upload, 
  Clock, 
  Video, 
  Code, 
  Mail, 
  Instagram, 
  Youtube, 
  Twitter, 
  Plus, 
  Copy, 
  Check, 
  BarChart3, 
  Zap, 
  ChevronRight, 
  Filter, 
  Share2, 
  Trash2, 
  Edit3, 
  Play, 
  Flame, 
  Sliders, 
  ArrowUpRight,
  Layers,
  Search,
  CheckCircle2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

// Preset Analytics Data for Upload Simulation
const ANALYTICS_PRESETS = {
  tiktok: {
    platform: "TikTok",
    followers: "124.8K",
    avgEngagement: "8.4%",
    bestTimes: ["18:00", "21:30", "12:15"],
    bestDays: ["Tuesday", "Thursday", "Sunday"],
    optimalDuration: "12 - 18 seconds",
    topFormats: ["Educational Micro-Tips", "POV Storytelling", "Behind the Scenes"],
    expectedReachMultiplier: "2.4x",
    peakHoursData: [12, 25, 40, 15, 10, 8, 14, 30, 65, 85, 95, 70, 50, 45, 60, 80, 98, 92, 84, 75, 60, 40, 25, 15]
  },
  instagram: {
    platform: "Instagram",
    followers: "89.2K",
    avgEngagement: "5.2%",
    bestTimes: ["11:30", "17:00", "20:00"],
    bestDays: ["Wednesday", "Friday", "Saturday"],
    optimalDuration: "25 - 40 seconds",
    topFormats: ["Carousel Infographics", "Relatable Reels", "Aesthetic Vlogs"],
    expectedReachMultiplier: "1.8x",
    peakHoursData: [8, 15, 20, 10, 5, 12, 35, 50, 75, 80, 65, 85, 90, 70, 60, 75, 92, 88, 80, 65, 45, 30, 20, 10]
  },
  youtube: {
    platform: "YouTube",
    followers: "45.6K",
    avgEngagement: "11.1%",
    bestTimes: ["15:00", "18:30"],
    bestDays: ["Friday", "Saturday", "Sunday"],
    optimalDuration: "45 - 60 seconds (Shorts) / 8-12 mins (Long)",
    topFormats: ["Deep Dive Coding/Tutorials", "Short Tech Hacks", "Product Comparison"],
    expectedReachMultiplier: "3.1x",
    peakHoursData: [5, 10, 15, 8, 4, 10, 20, 35, 45, 55, 60, 70, 75, 80, 88, 95, 99, 90, 82, 70, 50, 35, 20, 10]
  }
};

// Default Sample Content Library items
const INITIAL_LIBRARY = [
  {
    id: 'c1',
    title: '5 AI Tools Saving Me 20 Hours/Week',
    type: 'TikTok/Reels Script',
    platform: 'TikTok',
    status: 'Scheduled',
    scheduledTime: '2026-10-01T18:00',
    tone: 'Energetic',
    hook: 'Stop wasting hours on manual tasks in 2026...',
    content: `[HOOK - 0:00-0:03]\nStop wasting 20 hours a week on manual content formatting.\n\n[BODY - 0:03-0:12]\nHere are the 3 tools top creators use quietly:\n1. CreatorPulse for automated script drafting\n2. ElevenLabs for hyper-real voiceovers\n3. OpusClip for instant short cuts.\n\n[CTA - 0:12-0:15]\nSave this reel and comment "AI" to get my setup workflow!`,
    duration: '15s',
    projectedReach: '45.2K'
  },
  {
    id: 'c2',
    title: 'Why Most React Apps Slow Down at Scale',
    type: 'Blog Post',
    platform: 'Substack',
    status: 'Scripted',
    scheduledTime: '2026-10-02T11:30',
    tone: 'Technical',
    hook: 'Re-renders are killing your client bundle size.',
    content: `# Why Most React Apps Slow Down at Scale\n\nWhen scaling modern frontend applications, state distribution becomes your biggest bottleneck...\n\n\`\`\`javascript\n// Optimized selector pattern\nconst userDisplayName = useSelector((state) => state.user.name, shallowEqual);\n\`\`\`\n\nKey takeaways:\n- Avoid root context re-renders\n- Memoize expensive calculations\n- Implement dynamic code splitting`,
    duration: '5 min read',
    projectedReach: '12.8K'
  },
  {
    id: 'c3',
    title: 'Weekly Tech Digest: The AI Workflow Revolution',
    type: 'Email Newsletter',
    platform: 'Email',
    status: 'Idea',
    scheduledTime: '2026-10-04T09:00',
    tone: 'Storyteller',
    hook: 'How I built a $10k/mo automated media machine.',
    content: `Hey friends!\n\nThis week I analyzed over 500 creator accounts to see what content formats actually drive conversions in late 2026...\n\nHere's what I discovered...`,
    duration: '3 min read',
    projectedReach: '28.5K'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'analytics' | 'calendar' | 'library'
  const [library, setLibrary] = useState(INITIAL_LIBRARY);
  const [analyticsData, setAnalyticsData] = useState(ANALYTICS_PRESETS.tiktok);
  const [uploadedFileName, setUploadedFileName] = useState('tiktok_analytics_q3_2026.csv');
  
  // Generator State
  const [contentType, setContentType] = useState('TikTok/Reels Script');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Authentic');
  const [targetDuration, setTargetDuration] = useState('15s');
  const [platform, setPlatform] = useState('TikTok');
  const [targetAudience, setTargetAudience] = useState('Tech-savvy Creators & Developers');
  const [includeHook, setIncludeHook] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState(null);
  const [copied, setCopied] = useState(false);

  // Calendar State
  const [selectedDate, setSelectedDate] = useState('2026-10-01');
  const [viewMode, setViewMode] = useState('week'); // 'week' | 'month'
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [quickScheduleItem, setQuickScheduleItem] = useState(null);

  const handleGenerateContent = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setGeneratedOutput(null);

    const prompt = `Act as an elite social media content strategist and expert viral content writer.
Create a high-performing ${contentType} tailored for ${platform}.

Topic/Keywords: ${topic}
Brand Tone: ${tone}
Target Audience: ${targetAudience}
Target Length/Duration: ${targetDuration}
Include Standout Hook: ${includeHook ? 'Yes' : 'No'}

Analytics Context for Optimization:
- Peak engagement best time: ${analyticsData.bestTimes[0]}
- Optimal high-converting format: ${analyticsData.topFormats[0]}

Instructions:
1. Provide a catchy, high-converting Hook.
2. Structure the main body clean with clear section markers (e.g. [HOOK], [BODY], [CTA], or clean Markdown headers for blogs/emails/code).
3. Ensure line breaks match native platform feel (${platform}).
4. End with a compelling Call-to-Action (CTA).
`;

    try {
      const apiKey = ""; // Canvas environment auto-provides token
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: {
            parts: [{ text: "You are CreatorPulse AI, a top-tier viral content producer and copywriting strategist." }]
          }
        })
      });

      const data = await response.json();
      const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate content. Please try again.";

      // Extract hook
      const lines = outputText.split('\n');
      let hookLine = lines.find(l => l.toLowerCase().includes('hook') || l.length > 10) || lines[0];
      hookLine = hookLine.replace(/^#+\s*/, '').replace(/\[.*?\]/g, '').trim();

      const newContentObj = {
        id: `gen-${Date.now()}`,
        title: topic.length > 40 ? topic.substring(0, 40) + '...' : topic,
        type: contentType,
        platform: platform,
        status: 'Idea',
        scheduledTime: `${selectedDate}T${analyticsData.bestTimes[0]}`,
        tone: tone,
        hook: hookLine.substring(0, 80),
        content: outputText,
        duration: targetDuration,
        projectedReach: `${(Math.random() * 20 + 15).toFixed(1)}K`
      };

      setGeneratedOutput(newContentObj);
    } catch (error) {
      console.error("Generation error:", error);
      // Fallback content in case of network issue
      setGeneratedOutput({
        id: `gen-${Date.now()}`,
        title: topic,
        type: contentType,
        platform: platform,
        status: 'Idea',
        scheduledTime: `${selectedDate}T${analyticsData.bestTimes[0]}`,
        tone: tone,
        hook: `Stop making this mistake with ${topic}!`,
        content: `[HOOK - 0:00-0:03]\nStop making this mistake with ${topic}!\n\n[BODY - 0:03-0:20]\nHere is the exact strategy I use to get 3x higher engagement:\n1. Focus on immediate value deliverable\n2. Keep your script pacing under ${targetDuration}\n3. Optimize post time around ${analyticsData.bestTimes[0]}\n\n[CTA]\nFollow for daily high-growth insights!`,
        duration: targetDuration,
        projectedReach: '32.4K'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToLibrary = (item) => {
    if (!item) return;
    setLibrary(prev => [item, ...prev]);
    setActiveTab('library');
  };

  const handleScheduleItem = (item, dateTime) => {
    const updated = library.map(i => i.id === item.id ? { ...i, status: 'Scheduled', scheduledTime: dateTime || i.scheduledTime } : i);
    setLibrary(updated);
  };

  const handleCopyContent = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectPreset = (key) => {
    setAnalyticsData(ANALYTICS_PRESETS[key]);
    setUploadedFileName(`${key}_insights_q3_parsed.csv`);
    if (key === 'tiktok') setPlatform('TikTok');
    if (key === 'instagram') setPlatform('Instagram');
    if (key === 'youtube') setPlatform('YouTube');
  };

  const handleFileUploadSimulate = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      // Auto assign preset based on name match or fallback to TikTok
      const name = file.name.toLowerCase();
      if (name.includes('insta')) handleSelectPreset('instagram');
      else if (name.includes('tube') || name.includes('yt')) handleSelectPreset('youtube');
      else handleSelectPreset('tiktok');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900/80 backdrop-blur-md border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Brand */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-800/80">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                CreatorPulse
              </h1>
              <p className="text-xs text-indigo-400 font-medium">AI Content Engine v2.6</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('generator')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'generator'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>AI Content Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <TrendingUp className="h-4 w-4 text-violet-400" />
              <span>Analytics Predictor</span>
              <span className="ml-auto text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded-full border border-violet-500/30">AI</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'calendar'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <CalendarIcon className="h-4 w-4 text-pink-400" />
              <span>Smart Calendar</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'library'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>Content Library</span>
              <span className="ml-auto text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                {library.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Creator Channel Status Card */}
        <div className="mt-6 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-xs text-white">
                CP
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-200 truncate">Alex Riviera</p>
              <p className="text-[11px] text-slate-400 truncate">Tech & Creator Growth</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Predicted Boost</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
              <Flame className="h-3 w-3 fill-emerald-400" /> +184%
            </span>
          </div>
        </div>
      </aside>

      {/* Main App Workspace */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {/* TAB 1: AI CONTENT GENERATOR */}
        {activeTab === 'generator' && (
          <GeneratorStudio 
            contentType={contentType}
            setContentType={setContentType}
            topic={topic}
            setTopic={setTopic}
            tone={tone}
            setTone={setTone}
            targetDuration={targetDuration}
            setTargetDuration={setTargetDuration}
            platform={platform}
            setPlatform={setPlatform}
            targetAudience={targetAudience}
            setTargetAudience={setTargetAudience}
            includeHook={includeHook}
            setIncludeHook={setIncludeHook}
            isGenerating={isGenerating}
            handleGenerateContent={handleGenerateContent}
            generatedOutput={generatedOutput}
            analyticsData={analyticsData}
            handleSaveToLibrary={handleSaveToLibrary}
            copied={copied}
            handleCopyContent={handleCopyContent}
          />
        )}

        {/* TAB 2: ANALYTICS & PREDICTIVE ENGINE */}
        {activeTab === 'analytics' && (
          <AnalyticsPredictor 
            analyticsData={analyticsData}
            handleSelectPreset={handleSelectPreset}
            uploadedFileName={uploadedFileName}
            handleFileUploadSimulate={handleFileUploadSimulate}
            onOpenGenerator={() => setActiveTab('generator')}
          />
        )}

        {/* TAB 3: SMART CALENDAR */}
        {activeTab === 'calendar' && (
          <SmartCalendar 
            library={library}
            analyticsData={analyticsData}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            viewMode={viewMode}
            setViewMode={setViewMode}
            filterPlatform={filterPlatform}
            setFilterPlatform={setFilterPlatform}
            handleScheduleItem={handleScheduleItem}
            onOpenGenerator={() => setActiveTab('generator')}
          />
        )}

        {/* TAB 4: CONTENT LIBRARY */}
        {activeTab === 'library' && (
          <ContentLibrary 
            library={library}
            setLibrary={setLibrary}
            handleCopyContent={handleCopyContent}
            copied={copied}
            onOpenGenerator={() => setActiveTab('generator')}
          />
        )}
      </main>
    </div>
  );
}

function GeneratorStudio({
  contentType, setContentType,
  topic, setTopic,
  tone, setTone,
  targetDuration, setTargetDuration,
  platform, setPlatform,
  targetAudience, setTargetAudience,
  includeHook, setIncludeHook,
  isGenerating, handleGenerateContent,
  generatedOutput, analyticsData,
  handleSaveToLibrary, copied, handleCopyContent
}) {
  const contentTypes = [
    { id: 'TikTok/Reels Script', label: 'Short Video Script', icon: Video, platforms: ['TikTok', 'Instagram', 'YouTube'] },
    { id: 'Blog Post', label: 'SEO Blog / Essay', icon: FileText, platforms: ['Substack', 'Medium', 'Web'] },
    { id: 'Email Newsletter', label: 'Email Newsletter', icon: Mail, platforms: ['Email', 'Substack'] },
    { id: 'Social Caption', label: 'Post Caption & Threads', icon: Twitter, platforms: ['X/Twitter', 'Instagram', 'LinkedIn'] },
    { id: 'Code Snippet & Explainer', label: 'Code & Tech Breakdown', icon: Code, platforms: ['X/Twitter', 'GitHub', 'Medium'] },
  ];

  const tones = ['Authentic', 'Professional', 'Energetic', 'Technical', 'Storyteller', 'Humorous'];
  const durations = ['15s', '30s', '60s', '3 min read', '5 min read'];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900 p-5 rounded-2xl border border-indigo-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              AI Multi-Format Studio
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="h-3 w-3 text-emerald-400" /> Best post window: <strong className="text-slate-200">{analyticsData.bestTimes[0]}</strong>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Generate High-Converting Content</h2>
          <p className="text-sm text-slate-400">Customized for your audience retention analytics and platform algorithms.</p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
          <TrendingUp className="h-4 w-4 text-violet-400 shrink-0" />
          <div>
            <div className="text-slate-400">Target Analytics Preset</div>
            <div className="font-semibold text-slate-200">{analyticsData.platform} ({analyticsData.optimalDuration})</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-sm">
          {/* Format Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Content Format
            </label>
            <div className="grid grid-cols-1 gap-2">
              {contentTypes.map((item) => {
                const IconComponent = item.icon;
                const isSelected = contentType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setContentType(item.id);
                      setPlatform(item.platforms[0]);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-md'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-[11px] text-slate-500">{item.id}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Topic, Concept, or Keywords *
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., 5 habit hacks for developers in 2026, or How to scale React performance without re-renders"
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
            />
          </div>

          {/* Tone & Target Settings */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Brand Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Duration / Length
              </label>
              <select
                value={targetDuration}
                onChange={(e) => setTargetDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {durations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Platform Tag */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Target Social Platform
            </label>
            <div className="flex gap-2 flex-wrap">
              {['TikTok', 'Instagram', 'YouTube', 'X/Twitter', 'Substack', 'Email'].map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    platform === p
                      ? 'bg-violet-600/30 border-violet-500/60 text-violet-200 font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Hook Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <div className="text-xs font-semibold text-slate-200">Include Viral Hook Generator</div>
              <div className="text-[11px] text-slate-400">Crafts first 3-second retention anchor</div>
            </div>
            <input
              type="checkbox"
              checked={includeHook}
              onChange={(e) => setIncludeHook(e.target.checked)}
              className="h-4 w-4 rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 bg-slate-950"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleGenerateContent}
            disabled={isGenerating || !topic.trim()}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              isGenerating || !topic.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white hover:opacity-95 shadow-indigo-600/25 active:scale-[0.99]'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-white" />
                <span>Crafting AI Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-indigo-200" />
                <span>Generate Optimized Content</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Output Display */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 min-h-[520px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <h3 className="font-semibold text-sm text-slate-200">Generated Deliverable Output</h3>
            </div>
            {generatedOutput && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyContent(generatedOutput.content)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => handleSaveToLibrary(generatedOutput)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Save to Library</span>
                </button>
              </div>
            )}
          </div>

          {!generatedOutput && !isGenerating && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-3">
                <Sparkles className="h-8 w-8 text-indigo-400/60" />
              </div>
              <h4 className="text-slate-300 font-semibold mb-1">AI Studio Ready</h4>
              <p className="text-xs max-w-sm text-slate-500">
                Enter your topic, select your desired platform, tone, and click generate to craft optimized scripts, posts, or articles.
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                <Zap className="h-5 w-5 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-xs text-slate-400 font-medium animate-pulse">
                Analyzing platform retention trends & formatting script...
              </p>
            </div>
          )}

          {generatedOutput && !isGenerating && (
            <div className="flex-1 space-y-4 overflow-y-auto">
              {/* Output Metadata Badges */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-medium">
                  {generatedOutput.type}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 font-medium">
                  {generatedOutput.platform}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                  Target: {generatedOutput.duration}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
                  Est. Reach: {generatedOutput.projectedReach}
                </span>
              </div>

              {/* Hook Spotlight Box */}
              {generatedOutput.hook && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-500/30">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 mb-1 flex items-center gap-1">
                    <Flame className="h-3 w-3 fill-indigo-400" /> Viral Retention Hook Anchor
                  </div>
                  <p className="text-xs font-semibold text-slate-100 italic">
                    "{generatedOutput.hook}"
                  </p>
                </div>
              )}

              {/* Full Content Body */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs leading-relaxed font-mono whitespace-pre-wrap text-slate-300">
                {generatedOutput.content}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnalyticsPredictor({ analyticsData, handleSelectPreset, uploadedFileName, handleFileUploadSimulate, onOpenGenerator }) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Analytics Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
            Predictive Analytics
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">Social Performance Predictor</h2>
          <p className="text-sm text-slate-400">Upload your raw platform CSV or JSON export to extract hyper-customized posting insights.</p>
        </div>

        {/* Quick Data Preset Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Presets:</span>
          <button
            onClick={() => handleSelectPreset('tiktok')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              analyticsData.platform === 'TikTok'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            TikTok
          </button>
          <button
            onClick={() => handleSelectPreset('instagram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              analyticsData.platform === 'Instagram'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Instagram
          </button>
          <button
            onClick={() => handleSelectPreset('youtube')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              analyticsData.platform === 'YouTube'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            YouTube
          </button>
        </div>
      </div>

      {/* Upload Box Component */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 transition-all text-center">
        <input 
          type="file" 
          id="analytics-file" 
          onChange={handleFileUploadSimulate} 
          accept=".csv,.json"
          className="hidden" 
        />
        <label htmlFor="analytics-file" className="cursor-pointer flex flex-col items-center">
          <div className="p-3 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 mb-2">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-slate-200">
            Click to upload your Social Analytics file (.csv, .json)
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Supports Instagram Insights, TikTok Analytics, YouTube Studio CSVs
          </p>
          {uploadedFileName && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <CheckCircle2 className="h-3.5 w-3.5" /> Parsed file: {uploadedFileName}
            </div>
          )}
        </label>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Peak Audience Hours</div>
          <div className="text-xl font-bold text-indigo-300">{analyticsData.bestTimes.join(', ')}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Highest engagement window
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Ideal Video Duration</div>
          <div className="text-xl font-bold text-violet-300">{analyticsData.optimalDuration}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Based on 82% video completion rate
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Top Best Days to Post</div>
          <div className="text-xl font-bold text-pink-300">{analyticsData.bestDays.join(', ')}</div>
          <div className="text-[11px] text-pink-400 mt-1">
            Sunday & Thursday spike
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Expected Reach Multiplier</div>
          <div className="text-xl font-bold text-emerald-400">{analyticsData.expectedReachMultiplier}</div>
          <div className="text-[11px] text-emerald-400 mt-1">
            Vs off-peak posting times
          </div>
        </div>
      </div>

      {/* Hourly Audience Heatmap Chart */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-200 text-sm">Audience Activity & Golden Windows (24-Hour Cycle)</h3>
            <p className="text-xs text-slate-400">Darker violet bars indicate maximum active follower volume.</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-800"></span> Low
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span> Golden Window
            </span>
          </div>
        </div>

        {/* Simple Interactive Hourly Bar Chart */}
        <div className="h-44 flex items-end gap-1.5 pt-6 pb-2 border-b border-slate-800">
          {analyticsData.peakHoursData.map((val, idx) => {
            const isGolden = val > 75;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Hover Tooltip */}
                <div className="absolute -top-8 hidden group-hover:flex bg-slate-950 text-white text-[10px] px-2 py-1 rounded border border-slate-700 whitespace-nowrap z-10">
                  {idx}:00 - Intensity: {val}%
                </div>

                {/* Bar */}
                <div 
                  style={{ height: `${val}%` }} 
                  className={`w-full rounded-t-sm transition-all group-hover:opacity-80 ${
                    isGolden 
                      ? 'bg-gradient-to-t from-indigo-600 to-violet-400 shadow-md shadow-indigo-500/20' 
                      : val > 40 ? 'bg-indigo-900/70' : 'bg-slate-800/60'
                  }`}
                />
                
                {/* Hour Label every 3 hours */}
                {idx % 3 === 0 && (
                  <span className="text-[10px] text-slate-500 font-mono mt-1">{idx}h</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Formats & Action CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h3 className="font-semibold text-slate-200 text-sm">Top 3 Recommended Content Formats</h3>
          <div className="space-y-2">
            {analyticsData.topFormats.map((fmt, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                <span className="text-slate-200 font-medium">{idx + 1}. {fmt}</span>
                <span className="text-xs text-indigo-400 font-mono">High Engagement</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/30 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-100 text-base mb-1">Ready to create optimized posts?</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Apply these exact posting parameters ({analyticsData.optimalDuration}, optimal time {analyticsData.bestTimes[0]}) directly inside the AI Content Generator.
            </p>
          </div>
          <button
            onClick={onOpenGenerator}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch AI Generator with Presets</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function SmartCalendar({
  library, analyticsData, selectedDate, setSelectedDate,
  viewMode, setViewMode, filterPlatform, setFilterPlatform,
  handleScheduleItem, onOpenGenerator
}) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Filtering library items
  const filteredItems = useMemo(() => {
    return library.filter(item => {
      if (filterPlatform !== 'All' && item.platform !== filterPlatform) return false;
      return true;
    });
  }, [library, filterPlatform]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Calendar Bar Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
              Smart Schedule
            </span>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
              <Flame className="h-3 w-3" /> Peak Windows Highlighted
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Content Calendar & Pipeline</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Platform Filter */}
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Platforms</option>
            <option value="TikTok">TikTok</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="Substack">Substack</option>
            <option value="Email">Email</option>
          </select>

          <button
            onClick={onOpenGenerator}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="h-4 w-4" />
            <span>New Draft</span>
          </button>
        </div>
      </div>

      {/* Heatmap Banner Notice */}
      <div className="p-3.5 rounded-xl bg-violet-950/40 border border-violet-500/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-violet-200">
          <Zap className="h-4 w-4 text-violet-400 shrink-0" />
          <span>Golden Window Alert: Audience engagement peaks on <strong>Tuesday & Thursday at 18:00</strong>.</span>
        </div>
        <span className="text-[11px] bg-violet-500/20 text-violet-300 px-2.5 py-1 rounded-md font-mono">
          Auto-Fit Time
        </span>
      </div>

      {/* Weekly View Grid */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-800 text-center font-semibold text-xs text-slate-400 py-3 bg-slate-950/40">
          {daysOfWeek.map((day, idx) => (
            <div key={day} className="flex items-center justify-center gap-1">
              <span>{day}</span>
              {(day === 'Tue' || day === 'Thu' || day === 'Sun') && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" title="Golden Peak Day" />
              )}
            </div>
          ))}
        </div>

        {/* Calendar Grid Cells */}
        <div className="grid grid-cols-7 divide-x divide-slate-800/80 min-h-[420px]">
          {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
            const dateStr = `2026-10-0${dayNum}`;
            const dayItems = filteredItems.filter(i => i.scheduledTime.startsWith(dateStr));
            const isGoldenDay = dayNum === 2 || dayNum === 4 || dayNum === 7;

            return (
              <div 
                key={dayNum} 
                className={`p-2 space-y-2 relative transition-all ${
                  isGoldenDay ? 'bg-indigo-950/10' : 'bg-slate-900/20'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pb-1 border-b border-slate-800/40">
                  <span className={`font-bold ${isGoldenDay ? 'text-indigo-400' : 'text-slate-400'}`}>
                    Oct {dayNum}
                  </span>
                  {isGoldenDay && (
                    <span className="text-[9px] text-indigo-300 bg-indigo-500/20 px-1 rounded">Peak</span>
                  )}
                </div>

                {/* Scheduled Items list */}
                <div className="space-y-2">
                  {dayItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs hover:border-indigo-500/50 transition-all shadow-sm group"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                          {item.platform}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.scheduledTime.split('T')[1] || '18:00'}
                        </span>
                      </div>
                      <p className="font-medium text-slate-200 line-clamp-2 text-[11px] leading-snug">
                        {item.title}
                      </p>
                      
                      {/* Status pill */}
                      <div className="mt-2 flex items-center justify-between text-[10px]">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                          item.status === 'Scheduled' ? 'bg-emerald-500/20 text-emerald-300' :
                          item.status === 'Published' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-amber-500/20 text-amber-300'
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-slate-500 group-hover:text-slate-300">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  ))}

                  {dayItems.length === 0 && (
                    <div className="h-20 flex flex-col items-center justify-center border border-dashed border-slate-800/60 rounded-xl text-[11px] text-slate-600 hover:border-slate-700 transition-all cursor-pointer">
                      <span>Empty Slot</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ContentLibrary({ library, setLibrary, handleCopyContent, copied, onOpenGenerator }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredLibrary = library.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDeleteItem = (id) => {
    setLibrary(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Content Repository
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">Saved Drafts & Deliverables</h2>
        </div>

        <button
          onClick={onOpenGenerator}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-md self-start md:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Content</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved drafts, hooks, or topics..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none"
        >
          <option value="All">All Types</option>
          <option value="TikTok/Reels Script">Short Video Scripts</option>
          <option value="Blog Post">Blog Posts</option>
          <option value="Email Newsletter">Newsletters</option>
        </select>
      </div>

      {/* Library Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLibrary.map((item) => (
          <div key={item.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  {item.platform}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {item.duration}
                </span>
              </div>

              <h4 className="font-bold text-slate-200 text-sm line-clamp-1 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-mono bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                {item.content}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-medium">
                Est. Reach: {item.projectedReach}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopyContent(item.content)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  title="Copy Text"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 transition-all"
                  title="Delete Item"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredLibrary.length === 0 && (
          <div className="col-span-full text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-800 text-slate-500 text-xs">
            No saved content items matching your search.
          </div>
        )}
      </div>
    </div>
  );
}