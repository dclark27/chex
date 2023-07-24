export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      diner: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          receipt_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          receipt_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          receipt_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diner_receipt_id_fkey"
            columns: ["receipt_id"]
            referencedRelation: "receipt"
            referencedColumns: ["id"]
          }
        ]
      }
      diner_dish: {
        Row: {
          created_at: string | null
          diner_id: number | null
          dish_id: number | null
          id: number
        }
        Insert: {
          created_at?: string | null
          diner_id?: number | null
          dish_id?: number | null
          id?: number
        }
        Update: {
          created_at?: string | null
          diner_id?: number | null
          dish_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "diner_dish_diner_id_fkey"
            columns: ["diner_id"]
            referencedRelation: "diner"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diner_dish_dish_id_fkey"
            columns: ["dish_id"]
            referencedRelation: "dish"
            referencedColumns: ["id"]
          }
        ]
      }
      dish: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          price: number | null
          quantity: number | null
          receipt_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          price?: number | null
          quantity?: number | null
          receipt_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          price?: number | null
          quantity?: number | null
          receipt_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dish_receipt_id_fkey"
            columns: ["receipt_id"]
            referencedRelation: "receipt"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      receipt: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          paymentMethod: string | null
          receiptDate: string | null
          receiptImageUrl: string | null
          subtotal: number | null
          tax: number | null
          tip: number | null
          total: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          paymentMethod?: string | null
          receiptDate?: string | null
          receiptImageUrl?: string | null
          subtotal?: number | null
          tax?: number | null
          tip?: number | null
          total?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          paymentMethod?: string | null
          receiptDate?: string | null
          receiptImageUrl?: string | null
          subtotal?: number | null
          tax?: number | null
          tip?: number | null
          total?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "receipt_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
