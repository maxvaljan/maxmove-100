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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string | null
          key_name: string
          key_value: string
        }
        Insert: {
          created_at?: string | null
          key_name: string
          key_value: string
        }
        Update: {
          created_at?: string | null
          key_name?: string
          key_value?: string
        }
        Relationships: []
      }
      business_inquiries: {
        Row: {
          company_name: string
          contact_name: string
          created_at: string | null
          email: string
          id: string
          industry: string | null
          message: string | null
          phone: string | null
          status: string | null
        }
        Insert: {
          company_name: string
          contact_name: string
          created_at?: string | null
          email: string
          id?: string
          industry?: string | null
          message?: string | null
          phone?: string | null
          status?: string | null
        }
        Update: {
          company_name?: string
          contact_name?: string
          created_at?: string | null
          email?: string
          id?: string
          industry?: string | null
          message?: string | null
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string | null
          current_usage: number | null
          discount_amount: number | null
          discount_percentage: number | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_usage: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          current_usage?: number | null
          discount_amount?: number | null
          discount_percentage?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_usage?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          current_usage?: number | null
          discount_amount?: number | null
          discount_percentage?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_usage?: number | null
        }
        Relationships: []
      }
      Delivery: {
        Row: {
          createdAt: string
          deliveryAgent: string
          id: string
          orderId: string
          status: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          deliveryAgent: string
          id: string
          orderId: string
          status: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          deliveryAgent?: string
          id?: string
          orderId?: string
          status?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Delivery_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
        ]
      }
      Driver: {
        Row: {
          city: string | null
          created_at: string
          id: string
          latitude: number
          longitude: number
          phone_number: string | null
          rating: number | null
          status: Database["public"]["Enums"]["DriverStatus"]
          vehicle_number: string
          vehicle_type: Database["public"]["Enums"]["VehicleType"]
        }
        Insert: {
          city?: string | null
          created_at?: string
          id: string
          latitude: number
          longitude: number
          phone_number?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["DriverStatus"]
          vehicle_number: string
          vehicle_type: Database["public"]["Enums"]["VehicleType"]
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: string
          latitude?: number
          longitude?: number
          phone_number?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["DriverStatus"]
          vehicle_number?: string
          vehicle_type?: Database["public"]["Enums"]["VehicleType"]
        }
        Relationships: []
      }
      driver_payouts: {
        Row: {
          amount: number
          created_at: string | null
          driver_id: string
          id: string
          order_id: string
          payout_method: string | null
          platform_fee: number
          processed_at: string | null
          status: string
          transaction_reference: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          driver_id: string
          id?: string
          order_id: string
          payout_method?: string | null
          platform_fee: number
          processed_at?: string | null
          status?: string
          transaction_reference?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          driver_id?: string
          id?: string
          order_id?: string
          payout_method?: string | null
          platform_fee?: number
          processed_at?: string | null
          status?: string
          transaction_reference?: string | null
        }
        Relationships: []
      }
      driver_profiles: {
        Row: {
          created_at: string
          documents_submitted: boolean | null
          id: string
          insurance_info: Json | null
          license_number: string | null
          vehicle_plate: string | null
          vehicle_type: string | null
          verification_status: string | null
        }
        Insert: {
          created_at?: string
          documents_submitted?: boolean | null
          id: string
          insurance_info?: Json | null
          license_number?: string | null
          vehicle_plate?: string | null
          vehicle_type?: string | null
          verification_status?: string | null
        }
        Update: {
          created_at?: string
          documents_submitted?: boolean | null
          id?: string
          insurance_info?: Json | null
          license_number?: string | null
          vehicle_plate?: string | null
          vehicle_type?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      Location: {
        Row: {
          address: string
          created_at: string
          id: string
          label: string | null
          latitude: number
          longitude: number
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          id: string
          label?: string | null
          latitude: number
          longitude: number
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          label?: string | null
          latitude?: number
          longitude?: number
          user_id?: string
        }
        Relationships: []
      }
      Notification: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          type: Database["public"]["Enums"]["NotificationType"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id: string
          is_read?: boolean
          message: string
          type: Database["public"]["Enums"]["NotificationType"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          type?: Database["public"]["Enums"]["NotificationType"]
          user_id?: string
        }
        Relationships: []
      }
      Order: {
        Row: {
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          customer_id: string
          distance: number | null
          driver_id: string | null
          dropoff_address: string
          dropoff_latitude: number
          dropoff_longitude: number
          estimated_duration: unknown | null
          id: string
          insurance_required: boolean | null
          items: Json
          payment_method: string | null
          pickup_address: string
          pickup_latitude: number
          pickup_longitude: number
          price: number
          scheduled_pickup: string | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["OrderStatus"]
          total_weight: number | null
          updated_at: string
          vehicle_type_id: string | null
        }
        Insert: {
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          customer_id: string
          distance?: number | null
          driver_id?: string | null
          dropoff_address: string
          dropoff_latitude: number
          dropoff_longitude: number
          estimated_duration?: unknown | null
          id: string
          insurance_required?: boolean | null
          items?: Json
          payment_method?: string | null
          pickup_address: string
          pickup_latitude: number
          pickup_longitude: number
          price: number
          scheduled_pickup?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["OrderStatus"]
          total_weight?: number | null
          updated_at: string
          vehicle_type_id?: string | null
        }
        Update: {
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          customer_id?: string
          distance?: number | null
          driver_id?: string | null
          dropoff_address?: string
          dropoff_latitude?: number
          dropoff_longitude?: number
          estimated_duration?: unknown | null
          id?: string
          insurance_required?: boolean | null
          items?: Json
          payment_method?: string | null
          pickup_address?: string
          pickup_latitude?: number
          pickup_longitude?: number
          price?: number
          scheduled_pickup?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["OrderStatus"]
          total_weight?: number | null
          updated_at?: string
          vehicle_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Order_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "Driver"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_vehicle_type_id_fkey"
            columns: ["vehicle_type_id"]
            isOneToOne: false
            referencedRelation: "vehicle_types"
            referencedColumns: ["id"]
          },
        ]
      }
      Payment: {
        Row: {
          amount: number
          created_at: string
          id: string
          order_id: string
          payment_method: Database["public"]["Enums"]["PaymentMethod"]
          status: Database["public"]["Enums"]["PaymentStatus"]
        }
        Insert: {
          amount: number
          created_at?: string
          id: string
          order_id: string
          payment_method: Database["public"]["Enums"]["PaymentMethod"]
          status?: Database["public"]["Enums"]["PaymentStatus"]
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          order_id?: string
          payment_method?: Database["public"]["Enums"]["PaymentMethod"]
          status?: Database["public"]["Enums"]["PaymentStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "Payment_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          created_at: string | null
          details: Json
          id: string
          is_default: boolean | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          details: Json
          id?: string
          is_default?: boolean | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          details?: Json
          id?: string
          is_default?: boolean | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      phone_verifications: {
        Row: {
          attempts: number | null
          created_at: string | null
          expires_at: string | null
          id: string
          phone_number: string
          verification_code: string
          verified: boolean | null
        }
        Insert: {
          attempts?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          phone_number: string
          verification_code: string
          verified?: boolean | null
        }
        Update: {
          attempts?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          phone_number?: string
          verification_code?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      PhoneVerification: {
        Row: {
          attempts: number | null
          created_at: string | null
          expires_at: string | null
          id: string
          phone_number: string
          verification_code: string
          verified: boolean | null
        }
        Insert: {
          attempts?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          phone_number: string
          verification_code: string
          verified?: boolean | null
        }
        Update: {
          attempts?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          phone_number?: string
          verification_code?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      platform_fees: {
        Row: {
          created_at: string | null
          fee_percentage: number
          id: string
          is_active: boolean | null
          min_fee: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          fee_percentage?: number
          id?: string
          is_active?: boolean | null
          min_fee?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          fee_percentage?: number
          id?: string
          is_active?: boolean | null
          min_fee?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      profile_change_requests: {
        Row: {
          additional_info: Json | null
          created_at: string | null
          id: string
          previous_role: Database["public"]["Enums"]["user_role"]
          requested_role: Database["public"]["Enums"]["user_role"]
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          additional_info?: Json | null
          created_at?: string | null
          id?: string
          previous_role: Database["public"]["Enums"]["user_role"]
          requested_role: Database["public"]["Enums"]["user_role"]
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          additional_info?: Json | null
          created_at?: string | null
          id?: string
          previous_role?: Database["public"]["Enums"]["user_role"]
          requested_role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          e_receipt_email: string | null
          e_receipt_enabled: boolean | null
          email: string | null
          id: string
          language: Database["public"]["Enums"]["language_preference"] | null
          last_login: string | null
          name: string | null
          notification_preferences:
            | Database["public"]["Enums"]["notification_preference"]
            | null
          pending_role_change: Database["public"]["Enums"]["user_role"] | null
          phone_number: string | null
          proof_of_delivery_enabled: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          role_change_requested_at: string | null
          verified_phone: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          e_receipt_email?: string | null
          e_receipt_enabled?: boolean | null
          email?: string | null
          id?: string
          language?: Database["public"]["Enums"]["language_preference"] | null
          last_login?: string | null
          name?: string | null
          notification_preferences?:
            | Database["public"]["Enums"]["notification_preference"]
            | null
          pending_role_change?: Database["public"]["Enums"]["user_role"] | null
          phone_number?: string | null
          proof_of_delivery_enabled?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          role_change_requested_at?: string | null
          verified_phone?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          e_receipt_email?: string | null
          e_receipt_enabled?: boolean | null
          email?: string | null
          id?: string
          language?: Database["public"]["Enums"]["language_preference"] | null
          last_login?: string | null
          name?: string | null
          notification_preferences?:
            | Database["public"]["Enums"]["notification_preference"]
            | null
          pending_role_change?: Database["public"]["Enums"]["user_role"] | null
          phone_number?: string | null
          proof_of_delivery_enabled?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          role_change_requested_at?: string | null
          verified_phone?: boolean | null
        }
        Relationships: []
      }
      Rating: {
        Row: {
          comments: string | null
          created_at: string
          id: string
          order_id: string
          ratee_id: string
          rater_id: string
          rating: number
        }
        Insert: {
          comments?: string | null
          created_at?: string
          id: string
          order_id: string
          ratee_id: string
          rater_id: string
          rating: number
        }
        Update: {
          comments?: string | null
          created_at?: string
          id?: string
          order_id?: string
          ratee_id?: string
          rater_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "Rating_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          description: string | null
          file_path: string
          file_type: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_path: string
          file_type: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_path?: string
          file_type?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_coupons: {
        Row: {
          coupon_id: string
          created_at: string | null
          id: string
          is_used: boolean | null
          used_at: string | null
          user_id: string
        }
        Insert: {
          coupon_id: string
          created_at?: string | null
          id?: string
          is_used?: boolean | null
          used_at?: string | null
          user_id: string
        }
        Update: {
          coupon_id?: string
          created_at?: string | null
          id?: string
          is_used?: boolean | null
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_coupons_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_types: {
        Row: {
          base_price: number
          category: Database["public"]["Enums"]["vehicle_category"]
          created_at: string | null
          description: string
          dimensions: string
          id: string
          max_weight: string
          minimum_distance: number
          name: string
          price_per_km: number
        }
        Insert: {
          base_price?: number
          category: Database["public"]["Enums"]["vehicle_category"]
          created_at?: string | null
          description: string
          dimensions: string
          id?: string
          max_weight: string
          minimum_distance?: number
          name: string
          price_per_km?: number
        }
        Update: {
          base_price?: number
          category?: Database["public"]["Enums"]["vehicle_category"]
          created_at?: string | null
          description?: string
          dimensions?: string
          id?: string
          max_weight?: string
          minimum_distance?: number
          name?: string
          price_per_km?: number
        }
        Relationships: []
      }
      wallet: {
        Row: {
          balance: number
          created_at: string | null
          currency: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string | null
          currency?: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string | null
          currency?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          order_id: string | null
          payment_method: string | null
          placed_by: string | null
          reference_id: string | null
          status: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          order_id?: string | null
          payment_method?: string | null
          placed_by?: string | null
          reference_id?: string | null
          status: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          order_id?: string | null
          payment_method?: string | null
          placed_by?: string | null
          reference_id?: string | null
          status?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_driver_location: {
        Args: {
          p_driver_id: string
          p_latitude: number
          p_longitude: number
          p_status: Database["public"]["Enums"]["driverstatus"]
        }
        Returns: undefined
      }
    }
    Enums: {
      DeliveryStatus: "pending" | "out_for_delivery" | "delivered" | "failed"
      driverstatus: "available" | "busy" | "offline"
      DriverStatus: "available" | "busy" | "offline"
      language_preference: "en" | "de"
      notification_preference: "all" | "important" | "none"
      NotificationType: "order_update" | "promo" | "system"
      OrderStatus:
        | "pending"
        | "accepted"
        | "in_transit"
        | "completed"
        | "cancelled"
      PaymentMethod: "card" | "cash" | "wallet" | "other"
      PaymentStatus: "pending" | "completed" | "failed"
      transaction_type:
        | "deposit"
        | "withdrawal"
        | "refund"
        | "payment"
        | "platform_fee"
        | "driver_payout"
      user_role: "admin" | "driver" | "customer" | "business"
      UserType: "customer" | "driver" | "admin"
      vehicle_category:
        | "bike_motorcycle"
        | "car"
        | "van"
        | "light_truck"
        | "medium_truck"
        | "heavy_truck"
        | "towing"
        | "refrigerated"
      VehicleCategory:
        | "bike_motorcycle"
        | "car"
        | "van"
        | "refrigerated"
        | "towing"
        | "light_truck"
        | "medium_truck"
        | "heavy_truck"
      VehicleType: "bike" | "car" | "van" | "truck"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
