export function VocabularyTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const tabs = [{ id: 'suggested', label: 'Gợi ý' }, { id: 'my-sets', label: 'Bộ của tôi' }, { id: 'challenges', label: 'Thử thách' }, { id: 'games', label: '🎮 Trò chơi' }]
  return (
    <div className="flex gap-2 border-b border-border">
      {tabs.map(tab => <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`px-4 py-2 font-medium transition-all relative ${activeTab === tab.id ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary' : 'text-muted-foreground hover:text-foreground'}`}>{tab.label}</button>)}
    </div>
  )
}