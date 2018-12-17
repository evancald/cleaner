SELECT p.*, u.username, u.profile_pic, u.email
FROM posts p
JOIN users u ON u.userid=p.author
WHERE p.id=$1;