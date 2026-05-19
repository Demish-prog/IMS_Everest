import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useAppStore } from '@/store/useAppStore'

export function SettingsPage() {
  const { theme, setTheme } = useAppStore()

  return (
    <div>
      <h1 className="text-2xl font-bold text-heading mb-1">Settings</h1>
      <p className="text-sm text-slate-500 mb-6">Platform configuration and preferences</p>

      <div className="max-w-2xl space-y-6">
        <Card padding="md">
          <h2 className="font-semibold text-heading-card mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Organization Name</label>
              <Input defaultValue="Everest Networks" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Default Timezone</label>
              <Select
                options={[
                  { value: 'utc', label: 'UTC' },
                  { value: 'est', label: 'US/Eastern' },
                  { value: 'pst', label: 'US/Pacific' },
                ]}
              />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <h2 className="font-semibold text-heading-card mb-4">Appearance</h2>
          <Select
            label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ]}
          />
        </Card>

        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
