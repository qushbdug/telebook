// أنواع الرسائل
export interface TelegramMessage {
  message_id: number
  from: TelegramUser
  chat: TelegramChat
  date: number
  text?: string
  photo?: TelegramPhoto[]
  document?: TelegramDocument
  location?: TelegramLocation
  contact?: TelegramContact
  reply_to_message?: TelegramMessage
  forward_from?: TelegramUser
  forward_from_chat?: TelegramChat
  forward_date?: number
  edit_date?: number
  reply_markup?: TelegramReplyMarkup
}

// أنواع المستخدمين
export interface TelegramUser {
  id: number
  is_bot: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  added_to_attachment_menu?: boolean
  allows_write_to_pm?: boolean
}

// أنواع الدردشات
export interface TelegramChat {
  id: number
  type: 'private' | 'group' | 'supergroup' | 'channel'
  title?: string
  username?: string
  first_name?: string
  last_name?: string
  photo?: TelegramChatPhoto
  bio?: string
  description?: string
  invite_link?: string
  slow_mode_delay?: number
  message_auto_delete_time?: number
  has_private_forwards?: boolean
  has_protected_content?: boolean
  join_to_send_messages?: boolean
  join_by_request?: boolean
  is_forum?: boolean
  active_usernames?: string[]
  emoji_status_custom_emoji_id?: string
  has_hidden_members?: boolean
  has_aggressive_anti_spam_enabled?: boolean
}

// أنواع الصور
export interface TelegramPhoto {
  file_id: string
  file_unique_id: string
  width: number
  height: number
  file_size?: number
}

// أنواع المستندات
export interface TelegramDocument {
  file_id: string
  file_unique_id: string
  thumbnail?: TelegramPhoto
  file_name?: string
  mime_type?: string
  file_size?: number
}

// أنواع المواقع
export interface TelegramLocation {
  longitude: number
  latitude: number
  horizontal_accuracy?: number
  live_period?: number
  heading?: number
  proximity_alert_radius?: number
}

// أنواع جهات الاتصال
export interface TelegramContact {
  phone_number: string
  first_name: string
  last_name?: string
  user_id?: number
  vcard?: string
}

// أنواع الصور الشخصية للدردشة
export interface TelegramChatPhoto {
  small_file_id: string
  small_file_unique_id: string
  big_file_id: string
  big_file_unique_id: string
}

// أنواع علامات الرد
export interface TelegramReplyMarkup {
  inline_keyboard?: TelegramInlineKeyboardButton[][]
  keyboard?: TelegramKeyboardButton[][]
  resize_keyboard?: boolean
  one_time_keyboard?: boolean
  selective?: boolean
  input_field_placeholder?: string
}

// أنواع أزرار لوحة المفاتيح
export interface TelegramKeyboardButton {
  text: string
  request_contact?: boolean
  request_location?: boolean
  request_poll?: TelegramKeyboardButtonPollType
  web_app?: TelegramWebAppInfo
}

// أنواع أزرار لوحة المفاتيح المضمنة
export interface TelegramInlineKeyboardButton {
  text: string
  url?: string
  callback_data?: string
  web_app?: TelegramWebAppInfo
  login_url?: TelegramLoginUrl
  switch_inline_query?: string
  switch_inline_query_current_chat?: string
  callback_game?: TelegramCallbackGame
  pay?: boolean
}

// أنواع استعلامات Callback
export interface TelegramCallbackQuery {
  id: string
  from: TelegramUser
  message?: TelegramMessage
  inline_message_id?: string
  chat_instance: string
  data?: string
  game_short_name?: string
}

// أنواع تحديثات تيليجرام
export interface TelegramUpdate {
  update_id: number
  message?: TelegramMessage
  edited_message?: TelegramMessage
  channel_post?: TelegramMessage
  edited_channel_post?: TelegramMessage
  inline_query?: TelegramInlineQuery
  chosen_inline_result?: TelegramChosenInlineResult
  callback_query?: TelegramCallbackQuery
  shipping_query?: TelegramShippingQuery
  pre_checkout_query?: TelegramPreCheckoutQuery
  poll?: TelegramPoll
  poll_answer?: TelegramPollAnswer
  my_chat_member?: TelegramChatMemberUpdated
  chat_member?: TelegramChatMemberUpdated
  chat_join_request?: TelegramChatJoinRequest
}

// أنواع الاستعلامات المضمنة
export interface TelegramInlineQuery {
  id: string
  from: TelegramUser
  query: string
  offset: string
  chat_type?: string
  location?: TelegramLocation
}

// أنواع النتائج المختارة
export interface TelegramChosenInlineResult {
  result_id: string
  from: TelegramUser
  location?: TelegramLocation
  inline_message_id?: string
  query: string
}

// أنواع استعلامات الشحن
export interface TelegramShippingQuery {
  id: string
  from: TelegramUser
  invoice_payload: string
  shipping_address: TelegramShippingAddress
}

// أنواع استعلامات ما قبل الدفع
export interface TelegramPreCheckoutQuery {
  id: string
  from: TelegramUser
  currency: string
  total_amount: number
  invoice_payload: string
  shipping_option_id?: string
  order_info?: TelegramOrderInfo
}

// أنواع الاستطلاعات
export interface TelegramPoll {
  id: string
  question: string
  options: TelegramPollOption[]
  total_voter_count: number
  is_closed: boolean
  is_anonymous: boolean
  type: string
  allows_multiple_answers: boolean
  correct_option_id?: number
  explanation?: string
  explanation_entities?: TelegramMessageEntity[]
  open_period?: number
  close_date?: number
}

// أنواع خيارات الاستطلاع
export interface TelegramPollOption {
  text: string
  voter_count: number
}

// أنواع إجابات الاستطلاع
export interface TelegramPollAnswer {
  poll_id: string
  user: TelegramUser
  option_ids: number[]
}

// أنواع تحديثات أعضاء الدردشة
export interface TelegramChatMemberUpdated {
  chat: TelegramChat
  from: TelegramUser
  date: number
  old_chat_member: TelegramChatMember
  new_chat_member: TelegramChatMember
  invite_link?: TelegramChatInviteLink
}

// أنواع طلبات الانضمام للدردشة
export interface TelegramChatJoinRequest {
  chat: TelegramChat
  from: TelegramUser
  date: number
  bio?: string
  invite_link?: TelegramChatInviteLink
}

// أنواع أعضاء الدردشة
export interface TelegramChatMember {
  user: TelegramUser
  status: string
  custom_title?: string
  is_anonymous?: boolean
  can_be_edited?: boolean
  can_manage_chat?: boolean
  can_delete_messages?: boolean
  can_manage_video_chats?: boolean
  can_restrict_members?: boolean
  can_promote_members?: boolean
  can_change_info?: boolean
  can_invite_users?: boolean
  can_post_messages?: boolean
  can_edit_messages?: boolean
  can_pin_messages?: boolean
  can_post_stories?: boolean
  can_edit_stories?: boolean
  can_delete_stories?: boolean
  is_member?: boolean
  can_view_messages?: boolean
  can_send_messages?: boolean
  can_send_media_messages?: boolean
  can_send_polls?: boolean
  can_send_other_messages?: boolean
  can_add_web_page_previews?: boolean
  until_date?: number
}

// أنواع روابط الدعوة
export interface TelegramChatInviteLink {
  invite_link: string
  creator: TelegramUser
  creates_join_request: boolean
  is_primary: boolean
  is_revoked: boolean
  name?: string
  expire_date?: number
  member_count?: number
  pending_join_request_count?: number
}

// أنواع عناوين الشحن
export interface TelegramShippingAddress {
  country_code: string
  state: string
  city: string
  street_line1: string
  street_line2: string
  post_code: string
}

// أنواع معلومات الطلبات
export interface TelegramOrderInfo {
  name?: string
  phone_number?: string
  email?: string
  shipping_address?: TelegramShippingAddress
}

// أنواع معلومات التطبيق الويب
export interface TelegramWebAppInfo {
  url: string
}

// أنواع روابط تسجيل الدخول
export interface TelegramLoginUrl {
  url: string
  forward_text?: string
  bot_username?: string
  request_write_access?: boolean
}

// أنواع الألعاب
export interface TelegramCallbackGame {}

// أنواع كيانات الرسائل
export interface TelegramMessageEntity {
  type: string
  offset: number
  length: number
  url?: string
  user?: TelegramUser
  language?: string
  custom_emoji_id?: string
}

// أنواع أزرار الاستطلاع
export interface TelegramKeyboardButtonPollType {
  type?: string
}

// واجهة البوت الرئيسية
export interface TelegramBot {
  sendMessage(chatId: number, text: string, options?: any): Promise<any>
  sendMessageWithKeyboard(chatId: number, text: string, keyboard: any): Promise<any>
  sendMessageWithInlineKeyboard(chatId: number, text: string, inlineKeyboard: any): Promise<any>
  sendPhoto(chatId: number, photo: string, caption?: string, options?: any): Promise<any>
  editMessageText(chatId: number, messageId: number, text: string, options?: any): Promise<any>
  deleteMessage(chatId: number, messageId: number): Promise<any>
  answerCallbackQuery(callbackQueryId: string, text?: string): Promise<any>
  getMe(): Promise<any>
  setWebhook(webhookUrl: string): Promise<any>
  deleteWebhook(): Promise<any>
}

// أنواع الأوامر
export interface BotCommand {
  command: string
  description: string
}

// أنواع القوائم
export interface BotMenuButton {
  type: string
  text?: string
  web_app?: TelegramWebAppInfo
}

// أنواع الإعدادات
export interface BotSettings {
  is_private: boolean
  can_join_groups: boolean
  can_read_all_group_messages: boolean
  supports_inline_queries: boolean
}