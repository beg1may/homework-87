import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comments";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('posts');
        await db.dropCollection('comments');
    } catch (error) {
        console.log('Collections were not present, skipping drop');
    }

    const [userAlina, userAlex, userAnna] = await User.create(
        {
            username: 'Alina',
            password: '123',
            token: crypto.randomUUID()
        },
        {
            username: 'Alex',
            password: '123',
            token: crypto.randomUUID()
        },
        {
            username: 'Anna',
            password: '123',
            token: crypto.randomUUID()
        }
    );

    const [postPlace, postJogging] = await Post.create(
        {
            username: userAlina._id,
            title: 'Лучшие места Кыргызстана для путешествий',
            description: 'Топ-5 мест, которые стоит посетить этим летом — от озера Сары-Челек до пика Ленина.',
            image: 'https://example.com/images/kyrgyzstan-travel.jpg',
            datetime: new Date().toISOString()
        },
        {
            username: userAlex._id,
            title: 'Почему утренние пробежки улучшают настроение',
            description: 'Разбираем, как физическая активность с утра помогает справляться со стрессом и тревогой.',
            datetime: new Date().toISOString()
        }
    );

    await Comment.create(
        {
            username: userAlina._id,
            post: postJogging,
            description: 'Подтверждаю! Уже бегаю 2 недели и чувствую себя лучше.'
        },
        {
            username: userAnna._id,
            post: postJogging,
            description: 'Главное — начать. Спасибо за мотивацию!'
        },
        {
            username: userAlex._id,
            post: postPlace,
            description: 'Сары-Челек действительно шикарен! Спасибо за подборку.'
        },
        {
            username: userAnna._id,
            post: postPlace,
            description: 'А как туда добраться на машине? Было бы круто, если бы вы добавили маршруты.'
        }
    )

    await db.close();
};

run().catch(console.error);