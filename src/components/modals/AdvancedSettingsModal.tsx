import { LogoutIcon } from '@heroicons/react/outline'

import { SettingsButton } from '@ui/inputs/SettingsButton'
import { SettingsToggle } from '@ui/inputs/SettingsToggle'

import { BaseModal } from '@modals/BaseModal'

import { ENABLE_MIGRATE_STATS } from '@constants/settings'
import {
  HIGH_CONTRAST_MODE_DESCRIPTION,
  LONG_SHARE_DESCRIPTION,
  MIGRATE_BUTTON_TEXT,
  MIGRATE_DESCRIPTION_TEXT,
  MIGRATE_HEADING_TEXT,
  PERFORMANCE_MODE_DESCRIPTION,
} from '@constants/strings'

import useClientSettings, {
  updateClientSettings,
} from '@stores/useClientSettings'
import useModalStore, { updateModals } from '@stores/useModalStore'

export const AdvancedSettingsModal = () => {
  const isAdvancedSettingsModalOpen = useModalStore(
    (s) => s.modals.isAdvancedSettingsModalOpen,
  )

  const { isLongShare, isHighContrastMode, isPerfMode } = useClientSettings(
    (s) => ({
      isLongShare: s.isLongShare,
      isHighContrastMode: s.isHighContrastMode,
      isPerfMode: s.isPerfMode,
    }),
  )

  const handleMigrateStatsButton = () => {
    updateModals({
      isAdvancedSettingsModalOpen: false,
      isMigrateStatsModalOpen: true,
    })
  }
  const handleClose = () => {
    updateModals({
      isAdvancedSettingsModalOpen: false,
      isSettingsModalOpen: true,
    })
  }

  return (
    <BaseModal
      title="Advanced Settings"
      isOpen={isAdvancedSettingsModalOpen}
      handleClose={handleClose}
    >
      <div className="-mb-2 mt-2 flex flex-col divide-y divide-ui-main/50">
        <SettingsToggle
          settingName="Long Format Share Text"
          flag={isLongShare}
          handleFlag={(e: boolean) => updateClientSettings({ isLongShare: e })}
          description={LONG_SHARE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={(e: boolean) =>
            updateClientSettings({ isHighContrastMode: e })
          }
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Performance Mode"
          flag={isPerfMode}
          handleFlag={(e: boolean) => updateClientSettings({ isPerfMode: e })}
          description={PERFORMANCE_MODE_DESCRIPTION}
        />
        {ENABLE_MIGRATE_STATS && (
          <SettingsButton
            settingName={MIGRATE_HEADING_TEXT}
            description={MIGRATE_DESCRIPTION_TEXT}
            onClick={handleMigrateStatsButton}
            Icon={LogoutIcon}
            buttonText={MIGRATE_BUTTON_TEXT}
            priority="secondary"
          />
        )}
      </div>
    </BaseModal>
  )
}
