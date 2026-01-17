## Proje Açıklaması

Bu proje Node.js ve Express kullanılarak geliştirilmiş bir RESTful API projesidir.
Kullanıcı ve fotoğraf yönetimi işlemlerini içerir.

## Senaryo Tanımı

Kullanıcılar sisteme kayıt olabilir, giriş yapabilir ve kendilerine ait fotoğrafları yükleyebilir.
Her fotoğraf bir kullanıcıya aittir.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- MongoDB
- Mongoose

## API END POINT LİSTESİ

Method Endpoint Açıklama
POST /users/register Yeni kullanıcı kaydı
POST /users/login Kullanıcı girişi
GET /users/dashboard Kullanıcı paneli
POST /photos Yeni fotoğraf yükleme
![Database Diagram](./dosya_adi.jpg)
