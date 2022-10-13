export default function handler(req, res) {
    if (req.method === 'POST') {
        // console.log(req.body);
    } else {
        res.status(200).json([
            {
                date: "2022年9月13日",
                title: "Nextjsの基本をマスターする"
            },
            {
                date: "2022年9月14日",
                title: "Nextjsの基本をマスターする"
            },
            {
                date: "2022年9月15日",
                title: "Nextjsの基本をマスターする"
            },
            {
                date: "2022年9月16日",
                title: "Nextjsの基本をマスターする"
            },
        ])
    }
}