export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          created_at: string
          id: string
          name: string
          size: string | null
          status: string | null
          subscription_plan: string | null
          updated_at: string
          worker_count: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          size?: string | null
          status?: string | null
          subscription_plan?: string | null
          updated_at?: string
          worker_count?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          size?: string | null
          status?: string | null
          subscription_plan?: string | null
          updated_at?: string
          worker_count?: number | null
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          is_enabled: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feature_flags_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          last_login: string | null
          role: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_company"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number | null
          company_id: string | null
          created_at: string
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan: string
          status: string
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          company_id?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan: string
          status: string
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          company_id?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      system_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tropibrain_insights: {
        Row: {
          created_at: string
          id: string
          impact_score: number | null
          problem_summary: string
          proposed_feature: string
          source: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          impact_score?: number | null
          problem_summary: string
          proposed_feature: string
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          impact_score?: number | null
          problem_summary?: string
          proposed_feature?: string
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      time_entries: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          task_id: string | null
          start_time: string
          end_time: string | null
          duration_minutes: number | null
          description: string | null
          status: 'active' | 'completed' | 'paused'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id?: string | null
          task_id?: string | null
          start_time: string
          end_time?: string | null
          duration_minutes?: number | null
          description?: string | null
          status?: 'active' | 'completed' | 'paused'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string | null
          task_id?: string | null
          start_time?: string
          end_time?: string | null
          duration_minutes?: number | null
          description?: string | null
          status?: 'active' | 'completed' | 'paused'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          id: string
          company_id: string
          name: string
          description: string | null
          status: 'active' | 'completed' | 'on_hold'
          start_date: string | null
          end_date: string | null
          budget: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          description?: string | null
          status?: 'active' | 'completed' | 'on_hold'
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          description?: string | null
          status?: 'active' | 'completed' | 'on_hold'
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          id: string
          project_id: string
          name: string
          description: string | null
          status: 'pending' | 'in_progress' | 'completed'
          priority: 'low' | 'medium' | 'high'
          estimated_hours: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          description?: string | null
          status?: 'pending' | 'in_progress' | 'completed'
          priority?: 'low' | 'medium' | 'high'
          estimated_hours?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          description?: string | null
          status?: 'pending' | 'in_progress' | 'completed'
          priority?: 'low' | 'medium' | 'high'
          estimated_hours?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      payroll_entries: {
        Row: {
          id: string
          user_id: string
          pay_period_start: string
          pay_period_end: string
          total_hours: number
          hourly_rate: number
          total_pay: number
          status: 'pending' | 'approved' | 'paid'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pay_period_start: string
          pay_period_end: string
          total_hours: number
          hourly_rate: number
          total_pay: number
          status?: 'pending' | 'approved' | 'paid'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pay_period_start?: string
          pay_period_end?: string
          total_hours?: number
          hourly_rate?: number
          total_pay?: number
          status?: 'pending' | 'approved' | 'paid'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payroll_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      payroll_status: "paid" | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  auth: {
    Tables: {
      audit_log_entries: {
        Row: {
          instance_id: string | null
          id: string
          payload: Json | null
          created_at: string | null
          ip_address: string
        }
        Insert: {
          instance_id?: string | null
          id?: string
          payload?: Json | null
          created_at?: string | null
          ip_address?: string
        }
        Update: {
          instance_id?: string | null
          id?: string
          payload?: Json | null
          created_at?: string | null
          ip_address?: string
        }
        Relationships: []
      }
      flow_state: {
        Row: {
          id: string
          user_id: string | null
          auth_code: string
          code_challenge_method: string
          code_challenge: string
          provider_type: string
          provider_access_token: string | null
          provider_refresh_token: string | null
          created_at: string | null
          updated_at: string | null
          authentication_method: string
          auth_code_issued_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          auth_code: string
          code_challenge_method: string
          code_challenge: string
          provider_type: string
          provider_access_token?: string | null
          provider_refresh_token?: string | null
          created_at?: string | null
          updated_at?: string | null
          authentication_method: string
          auth_code_issued_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          auth_code?: string
          code_challenge_method?: string
          code_challenge?: string
          provider_type?: string
          provider_access_token?: string | null
          provider_refresh_token?: string | null
          created_at?: string | null
          updated_at?: string | null
          authentication_method?: string
          auth_code_issued_at?: string | null
        }
        Relationships: []
      }
      identities: {
        Row: {
          provider_id: string
          user_id: string
          identity_data: Json
          provider: string
          last_sign_in_at: string | null
          created_at: string | null
          updated_at: string | null
          email: string | null
          id: string
        }
        Insert: {
          provider_id: string
          user_id: string
          identity_data: Json
          provider: string
          last_sign_in_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          email?: string | null
          id?: string
        }
        Update: {
          provider_id?: string
          user_id?: string
          identity_data?: Json
          provider?: string
          last_sign_in_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      instances: {
        Row: {
          id: string
          uuid: string | null
          raw_base_config: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          uuid?: string | null
          raw_base_config?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          uuid?: string | null
          raw_base_config?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      mfa_amr_claims: {
        Row: {
          session_id: string
          created_at: string
          updated_at: string
          authentication_method: string
          id: string
        }
        Insert: {
          session_id: string
          created_at: string
          updated_at: string
          authentication_method: string
          id?: string
        }
        Update: {
          session_id?: string
          created_at?: string
          updated_at?: string
          authentication_method?: string
          id?: string
        }
        Relationships: []
      }
      mfa_challenges: {
        Row: {
          id: string
          factor_id: string
          created_at: string
          verified_at: string | null
          ip_address: string
          otp_code: string | null
          web_authn_session_data: Json | null
        }
        Insert: {
          id?: string
          factor_id: string
          created_at: string
          verified_at?: string | null
          ip_address: string
          otp_code?: string | null
          web_authn_session_data?: Json | null
        }
        Update: {
          id?: string
          factor_id?: string
          created_at?: string
          verified_at?: string | null
          ip_address?: string
          otp_code?: string | null
          web_authn_session_data?: Json | null
        }
        Relationships: []
      }
      mfa_factors: {
        Row: {
          id: string
          user_id: string
          friendly_name: string | null
          factor_type: string
          status: string
          created_at: string
          updated_at: string
          secret: string | null
          phone: string | null
          last_challenged_at: string | null
          web_authn_credential: Json | null
          web_authn_aaguid: string | null
        }
        Insert: {
          id?: string
          user_id: string
          friendly_name?: string | null
          factor_type: string
          status: string
          created_at: string
          updated_at: string
          secret?: string | null
          phone?: string | null
          last_challenged_at?: string | null
          web_authn_credential?: Json | null
          web_authn_aaguid?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          friendly_name?: string | null
          factor_type?: string
          status?: string
          created_at?: string
          updated_at?: string
          secret?: string | null
          phone?: string | null
          last_challenged_at?: string | null
          web_authn_credential?: Json | null
          web_authn_aaguid?: string | null
        }
        Relationships: []
      }
      one_time_tokens: {
        Row: {
          id: string
          user_id: string
          token_type: string
          token_hash: string
          relates_to: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          token_type: string
          token_hash: string
          relates_to: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          token_type?: string
          token_hash?: string
          relates_to?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      refresh_tokens: {
        Row: {
          instance_id: string | null
          id: number
          token: string | null
          user_id: string | null
          revoked: boolean | null
          created_at: string | null
          updated_at: string | null
          parent: string | null
          session_id: string | null
        }
        Insert: {
          instance_id?: string | null
          id?: number
          token?: string | null
          user_id?: string | null
          revoked?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          parent?: string | null
          session_id?: string | null
        }
        Update: {
          instance_id?: string | null
          id?: number
          token?: string | null
          user_id?: string | null
          revoked?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          parent?: string | null
          session_id?: string | null
        }
        Relationships: []
      }
      saml_providers: {
        Row: {
          id: string
          sso_provider_id: string
          entity_id: string
          metadata_xml: string
          metadata_url: string | null
          attribute_mapping: Json | null
          created_at: string | null
          updated_at: string | null
          name_id_format: string | null
        }
        Insert: {
          id?: string
          sso_provider_id: string
          entity_id: string
          metadata_xml: string
          metadata_url?: string | null
          attribute_mapping?: Json | null
          created_at?: string | null
          updated_at?: string | null
          name_id_format?: string | null
        }
        Update: {
          id?: string
          sso_provider_id?: string
          entity_id?: string
          metadata_xml?: string
          metadata_url?: string | null
          attribute_mapping?: Json | null
          created_at?: string | null
          updated_at?: string | null
          name_id_format?: string | null
        }
        Relationships: []
      }
      saml_relay_states: {
        Row: {
          id: string
          sso_provider_id: string
          request_id: string
          for_email: string | null
          redirect_to: string | null
          created_at: string | null
          updated_at: string | null
          flow_state_id: string | null
        }
        Insert: {
          id?: string
          sso_provider_id: string
          request_id: string
          for_email?: string | null
          redirect_to?: string | null
          created_at?: string | null
          updated_at?: string | null
          flow_state_id?: string | null
        }
        Update: {
          id?: string
          sso_provider_id?: string
          request_id?: string
          for_email?: string | null
          redirect_to?: string | null
          created_at?: string | null
          updated_at?: string | null
          flow_state_id?: string | null
        }
        Relationships: []
      }
      schema_migrations: {
        Row: {
          version: string
        }
        Insert: {
          version: string
        }
        Update: {
          version?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          created_at: string | null
          updated_at: string | null
          factor_id: string | null
          aal: string | null
          not_after: string | null
          refreshed_at: string | null
          user_agent: string | null
          ip: string | null
          tag: string | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string | null
          updated_at?: string | null
          factor_id?: string | null
          aal?: string | null
          not_after?: string | null
          refreshed_at?: string | null
          user_agent?: string | null
          ip?: string | null
          tag?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string | null
          updated_at?: string | null
          factor_id?: string | null
          aal?: string | null
          not_after?: string | null
          refreshed_at?: string | null
          user_agent?: string | null
          ip?: string | null
          tag?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      payroll_status: ["paid", "unpaid"],
    },
  },
} as const 