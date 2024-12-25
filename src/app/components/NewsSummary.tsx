import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Skeleton } from "@mui/material";



export default function NewsSummary(){
  const [responseLines, setResponseLines] = useState([]);
  const [loading, setLoadin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewsSummaryByGemini = async () => {
      try {
        const res = await fetch('/api/gemini', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: "本日の日本の政治・経済に関わるニュース内容を1分で読めるようにまとめてください。日本語で箇条書きで教えてください。補足は要りません。",
          }),
        });
        if(!res.ok){
          throw new Error("サーバーエラーが発生しました。");
        }
        const data = await res.json();
        console.log(data);
        const lines = data.text.split(/\n\*/g);
        setResponseLines(lines);
      } catch (error) {
        setError(error instanceof Error ? error.message : "未知のエラーが発生しました。");
      } finally {
        setLoadin(false);
      }
    }

    fetchNewsSummaryByGemini();
  },[]);

  return(
    <Box sx={{ marginBottom: '48px' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        本日のニュースAI要約
      </Typography>
      <Box>
        <Card>
        <CardContent>
            {loading ? (
              <>
                <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
              </>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              // <Typography>{responseText}</Typography>
              <div>
                {responseLines.map((line, index) => (
                  <Typography key={index}>・{line}</Typography>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}