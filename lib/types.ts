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
