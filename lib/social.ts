export type SocialPlatform = {
  key: string
  label: string
  placeholder: string
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { key: 'social_facebook', label: 'Facebook', placeholder: 'https://facebook.com/clinicalatino' },
  { key: 'social_instagram', label: 'Instagram', placeholder: 'https://instagram.com/clinicalatino' },
  { key: 'social_tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@clinicalatino' },
  { key: 'social_youtube', label: 'YouTube', placeholder: 'https://youtube.com/@clinicalatino' },
  { key: 'social_whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/59399XXXXXXX' },
  { key: 'social_x', label: 'X (Twitter)', placeholder: 'https://x.com/clinicalatino' },
  { key: 'social_linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/clinicalatino' },
]
