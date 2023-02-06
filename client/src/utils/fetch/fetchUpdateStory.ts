type StoryUpdateDetails = {
  id?: number;
  title?: string;
  description?: string;
  board_id?: number;
  status_panel?: number;
};
//update our story by id
const fetchUpdateStory = async (
  storyId: number,
  storyDetails: StoryUpdateDetails
): Promise<boolean> => {
  const url = `${import.meta.env.VITE_BASE_URL}/stories/${storyId}`;

  try {
    const result = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ id: storyId, storyDetails: storyDetails }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (result.ok) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default fetchUpdateStory;
