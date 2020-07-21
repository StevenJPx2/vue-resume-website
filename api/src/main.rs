use actix_web::{web, App, get,HttpResponse, HttpServer, Responder};
use actix_rt;


struct User {
    username: String
}

#[get("/hello")]
async fn index(user_data: web::Data<User>) -> impl Responder {
    HttpResponse::Ok().body(format!("<h1>Hello {}</h1>", &user_data.username))
}

#[get("/404")]
async fn error_404() -> impl Responder {
    HttpResponse::Ok().body("404 Not Found")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(
            web::scope("/hello").data(User {username: "Steven".to_string()}).service(index),
        ).service(error_404)
    }).bind("127.0.0.1:8088")?.run().await
}
