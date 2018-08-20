# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_06_050139) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "erc_transactions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.decimal "amount", null: false
    t.string "tx_hash", limit: 66
    t.string "status", default: "pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["status"], name: "index_erc_transactions_on_status"
    t.index ["user_id"], name: "index_erc_transactions_on_user_id"
  end

  create_table "hunt_transactions", force: :cascade do |t|
    t.decimal "amount", null: false
    t.string "memo"
    t.datetime "created_at", null: false
    t.string "sender"
    t.string "receiver"
    t.string "bounty_type"
    t.index ["bounty_type"], name: "index_hunt_transactions_on_bounty_type"
    t.index ["receiver"], name: "index_hunt_transactions_on_receiver"
    t.index ["sender"], name: "index_hunt_transactions_on_sender"
  end

  create_table "posts", force: :cascade do |t|
    t.string "author", null: false
    t.string "url", null: false
    t.string "title", null: false
    t.string "tagline", null: false
    t.string "tags", default: [], array: true
    t.json "images"
    t.json "beneficiaries"
    t.string "permlink"
    t.boolean "is_active", default: true
    t.float "payout_value", default: 0.0
    t.json "active_votes", default: []
    t.integer "children", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.boolean "is_verified", default: false
    t.string "verified_by"
    t.float "hunt_score", default: 0.0
    t.json "valid_votes", default: []
    t.datetime "listed_at"
    t.index "((((to_tsvector('english'::regconfig, (author)::text) || to_tsvector('english'::regconfig, (title)::text)) || to_tsvector('english'::regconfig, (tagline)::text)) || to_tsvector('english'::regconfig, immutable_array_to_string(tags, ' '::text))))", name: "index_posts_full_text", using: :gin
    t.index ["author", "permlink"], name: "index_posts_on_author_and_permlink", unique: true
    t.index ["created_at"], name: "index_posts_on_created_at"
    t.index ["is_active"], name: "index_posts_on_is_active"
    t.index ["listed_at"], name: "index_posts_on_listed_at"
    t.index ["url"], name: "index_posts_on_url", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "encrypted_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "session_count", default: 0
    t.decimal "hunt_balance", default: "0.0"
    t.string "eth_address", limit: 42
    t.datetime "last_logged_in_at"
    t.integer "reputation", default: 0
    t.datetime "blacklisted_at"
    t.float "cached_user_score", default: -1.0
    t.datetime "user_score_updated_at"
    t.float "vesting_shares", default: -1.0
    t.integer "circle_vote_count", default: 0
    t.string "last_ip"
    t.float "activity_score", default: 1.0
    t.index ["encrypted_token", "reputation"], name: "index_users_on_encrypted_token_and_reputation"
    t.index ["last_logged_in_at"], name: "index_users_on_last_logged_in_at"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
