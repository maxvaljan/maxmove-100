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
          created_at: string
          id: string
          latitude: number
          longitude: number
          rating: number | null
          status: Database["public"]["Enums"]["DriverStatus"]
          vehicle_number: string
          vehicle_type: Database["public"]["Enums"]["VehicleType"]
        }
        Insert: {
          created_at?: string
          id: string
          latitude: number
          longitude: number
          rating?: number | null
          status?: Database["public"]["Enums"]["DriverStatus"]
          vehicle_number: string
          vehicle_type: Database["public"]["Enums"]["VehicleType"]
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number
          longitude?: number
          rating?: number | null
          status?: Database["public"]["Enums"]["DriverStatus"]
          vehicle_number?: string
          vehicle_type?: Database["public"]["Enums"]["VehicleType"]
        }
        Relationships: []
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
          created_at: string
          customer_id: string
          driver_id: string | null
          dropoff_address: string
          dropoff_latitude: number
          dropoff_longitude: number
          id: string
          items: Json
          pickup_address: string
          pickup_latitude: number
          pickup_longitude: number
          price: number
          status: Database["public"]["Enums"]["OrderStatus"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          driver_id?: string | null
          dropoff_address: string
          dropoff_latitude: number
          dropoff_longitude: number
          id: string
          items?: Json
          pickup_address: string
          pickup_latitude: number
          pickup_longitude: number
          price: number
          status?: Database["public"]["Enums"]["OrderStatus"]
          updated_at: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          driver_id?: string | null
          dropoff_address?: string
          dropoff_latitude?: number
          dropoff_longitude?: number
          id?: string
          items?: Json
          pickup_address?: string
          pickup_latitude?: number
          pickup_longitude?: number
          price?: number
          status?: Database["public"]["Enums"]["OrderStatus"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Order_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "Driver"
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
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      DeliveryStatus: "pending" | "out_for_delivery" | "delivered" | "failed"
      DriverStatus: "available" | "busy" | "offline"
      NotificationType: "order_update" | "promo" | "system"
      OrderStatus:
        | "pending"
        | "accepted"
        | "in_transit"
        | "completed"
        | "cancelled"
      PaymentMethod: "card" | "cash" | "wallet" | "other"
      PaymentStatus: "pending" | "completed" | "failed"
      UserType: "customer" | "driver" | "admin"
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