interface HnStory {
  by: string;
  descendants: number;
  id: string;
  score: number;
  time: number;
  title: string;
  type: 'story';
  url: string;
}

type onPress = () => void;

type onBookmarkChange = (id: string) => void;
