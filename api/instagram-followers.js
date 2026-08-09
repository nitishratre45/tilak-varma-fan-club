export default async function handler(req, res) {
  try {
    const username = "tilakvarma72fc";

    const url =
      `https://matrix.sbapis.com/b/instagram/statistics` +
      `?query=${encodeURIComponent(username)}` +
      `&history=default` +
      `&allow-stale=false`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        clientid: process.env.SOCIALBLADE_CLIENT_ID,
        token: process.env.SOCIALBLADE_TOKEN,
      },
    });

    const data = await response.json();

    if (!response.ok || !data?.status?.success) {
      return res.status(500).json({
        success: false,
        error: data?.status?.error || "Social Blade API error",
      });
    }

    const followers =
      data?.data?.statistics?.total?.followers;

    if (typeof followers !== "number") {
      return res.status(500).json({
        success: false,
        error: "Follower count not found",
      });
    }

    return res.status(200).json({
      success: true,
      followers,
    });

  } catch (error) {
    console.error("Instagram followers error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to fetch Instagram followers",
    });
  }
}