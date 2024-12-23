export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing image URL");

  const response = await fetch(url);
  const contentType = response.headers.get("content-type");
  const buffer = await response.arrayBuffer();

  res.setHeader("Content-Type", contentType);
  res.send(Buffer.from(buffer));
}
