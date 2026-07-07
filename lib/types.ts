export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled'

export type WeekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type ScheduleBlock = {
  day: WeekDay
  start: string // "HH:mm"
  end: string // "HH:mm"
}

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string
          created_at: string
          patient_name: string
          patient_email: string
          patient_phone: string
          specialty: string
          preferred_date: string
          preferred_time: string
          notes: string | null
          status: AppointmentStatus
        }
        Insert: {
          id?: string
          created_at?: string
          patient_name: string
          patient_email: string
          patient_phone: string
          specialty: string
          preferred_date: string
          preferred_time: string
          notes?: string | null
          status?: AppointmentStatus
        }
        Update: Partial<{
          patient_name: string
          patient_email: string
          patient_phone: string
          specialty: string
          preferred_date: string
          preferred_time: string
          notes: string | null
          status: AppointmentStatus
        }>
        Relationships: []
      }
      doctors: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          full_name: string
          specialty: string
          specialty_label: string
          subspecialty: string
          bio: string
          experience: string
          education: string[]
          schedule: string
          schedule_days: ScheduleBlock[]
          languages: string[]
          photo_url: string | null
          office_number: string | null
          tower: string | null
          contact_phone: string | null
          facebook_url: string | null
          instagram_url: string | null
          linkedin_url: string | null
          whatsapp_url: string | null
          display_order: number
          active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          slug: string
          full_name: string
          specialty: string
          specialty_label: string
          subspecialty: string
          bio: string
          experience: string
          education?: string[]
          schedule: string
          schedule_days?: ScheduleBlock[]
          languages?: string[]
          photo_url?: string | null
          office_number?: string | null
          tower?: string | null
          contact_phone?: string | null
          facebook_url?: string | null
          instagram_url?: string | null
          linkedin_url?: string | null
          whatsapp_url?: string | null
          display_order?: number
          active?: boolean
        }
        Update: Partial<{
          slug: string
          full_name: string
          specialty: string
          specialty_label: string
          subspecialty: string
          bio: string
          experience: string
          education: string[]
          schedule: string
          schedule_days: ScheduleBlock[]
          languages: string[]
          photo_url: string | null
          office_number: string | null
          tower: string | null
          contact_phone: string | null
          facebook_url: string | null
          instagram_url: string | null
          linkedin_url: string | null
          whatsapp_url: string | null
          display_order: number
          active: boolean
        }>
        Relationships: []
      }
      specialties: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          label: string
          description: string
          icon: string
          color_class: string
          display_order: number
          active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          slug: string
          label: string
          description: string
          icon?: string
          color_class?: string
          display_order?: number
          active?: boolean
        }
        Update: Partial<{
          slug: string
          label: string
          description: string
          icon: string
          color_class: string
          display_order: number
          active: boolean
        }>
        Relationships: []
      }
      news: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          title: string
          excerpt: string
          content: string
          cover_image_url: string | null
          published_at: string
          display_order: number
          active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          slug: string
          title: string
          excerpt: string
          content: string
          cover_image_url?: string | null
          published_at?: string
          display_order?: number
          active?: boolean
        }
        Update: Partial<{
          slug: string
          title: string
          excerpt: string
          content: string
          cover_image_url: string | null
          published_at: string
          display_order: number
          active: boolean
        }>
        Relationships: []
      }
      packages: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          title: string
          description: string
          price: string
          image_url: string | null
          items: string[]
          display_order: number
          active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          slug: string
          title: string
          description: string
          price?: string
          image_url?: string | null
          items?: string[]
          display_order?: number
          active?: boolean
        }
        Update: Partial<{
          slug: string
          title: string
          description: string
          price: string
          image_url: string | null
          items: string[]
          display_order: number
          active: boolean
        }>
        Relationships: []
      }
      insurance_logos: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          logo_url: string | null
          display_order: number
          active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          logo_url?: string | null
          display_order?: number
          active?: boolean
        }
        Update: Partial<{
          name: string
          logo_url: string | null
          display_order: number
          active: boolean
        }>
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: string | null
          updated_at: string
        }
        Insert: {
          key: string
          value?: string | null
          updated_at?: string
        }
        Update: Partial<{
          value: string | null
          updated_at: string
        }>
        Relationships: []
      }
      services: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          icon: string | null
          active: boolean
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: string
          icon?: string | null
          active?: boolean
        }
        Update: Partial<{
          name: string
          description: string
          category: string
          icon: string | null
          active: boolean
        }>
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          created_at: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          cover_url: string | null
          author: string
          published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          cover_url?: string | null
          author: string
          published?: boolean
        }
        Update: Partial<{
          title: string
          slug: string
          content: string
          excerpt: string | null
          cover_url: string | null
          author: string
          published: boolean
        }>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Doctor = Database['public']['Tables']['doctors']['Row']
export type DoctorInsert = Database['public']['Tables']['doctors']['Insert']
export type DoctorUpdate = Database['public']['Tables']['doctors']['Update']

export type Specialty = Database['public']['Tables']['specialties']['Row']
export type SpecialtyInsert = Database['public']['Tables']['specialties']['Insert']
export type SpecialtyUpdate = Database['public']['Tables']['specialties']['Update']

export type InsuranceLogo = Database['public']['Tables']['insurance_logos']['Row']
export type InsuranceLogoInsert = Database['public']['Tables']['insurance_logos']['Insert']
export type InsuranceLogoUpdate = Database['public']['Tables']['insurance_logos']['Update']

export type News = Database['public']['Tables']['news']['Row']
export type NewsInsert = Database['public']['Tables']['news']['Insert']
export type NewsUpdate = Database['public']['Tables']['news']['Update']

export type PackageItem = Database['public']['Tables']['packages']['Row']
export type PackageInsert = Database['public']['Tables']['packages']['Insert']
export type PackageUpdate = Database['public']['Tables']['packages']['Update']
