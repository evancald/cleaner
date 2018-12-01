SELECT p.title, p.price, p.city, u.username, u.profile_pic
FROM posts p
JOIN users u ON u.id = p.author;