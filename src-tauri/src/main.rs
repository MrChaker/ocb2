#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::env;

#[tauri::command]
fn get_app_url() -> String {
    env::set_var("APP_URL", "http://localhost:3000");
    let app_url = env::var("APP_URL").expect(" not found!");
    return app_url;
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_app_url])
        .run(context)
        .expect("error while running tauri application");
}
