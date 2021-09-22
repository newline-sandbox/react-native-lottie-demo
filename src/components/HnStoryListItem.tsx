import React, {FC, useEffect, useRef} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';

interface HnStoryListItemProps {
  story: HnStory;
  onPress?: onPress;
  onBookmarkChange: onBookmarkChange;
  isBookmarked: boolean;
}

const HnStoryListItem: FC<HnStoryListItemProps> = ({
  story,
  onPress,
  onBookmarkChange,
  isBookmarked,
}) => {
  const animation = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      if (isBookmarked) {
        animation.current.play(21, 21);
      } else {
        animation.current.play(0, 0);
      }

      isInitialMount.current = false;
    } else {
      if (isBookmarked) {
        animation.current.play(1, 21);
      } else {
        animation.current.play(8, 0);
      }
    }
  }, [isBookmarked]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.listItem]}>
        <Text style={[styles.title]} numberOfLines={1}>
          {story.title}
        </Text>
        <TouchableOpacity
          style={[styles.urlContainer]}
          onPress={() => Linking.openURL(story.url)}>
          <Text style={[styles.url]} numberOfLines={1}>
            {story.url || '---'}
          </Text>
        </TouchableOpacity>
        <View style={[styles.listItemFooter]}>
          <View style={[styles.metaInfo]}>
            <Text style={[styles.score]}>{story.score} points</Text>
            <Text style={[styles.separator]}>|</Text>
            <TouchableOpacity
              style={[styles.byContainer]}
              onPress={() =>
                Linking.openURL(
                  `https://news.ycombinator.com/user?id=${story.by}`,
                )
              }>
              <Text style={[styles.by]}>{story.by}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => onBookmarkChange(story.id)}>
            <LottieView
              source={require('../../assets/bookmark-animation.json')}
              style={styles.bookmark}
              autoPlay={false}
              loop={false}
              ref={animation}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  urlContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  url: {
    fontSize: 16,
    opacity: 0.7,
  },
  listItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  score: {
    fontWeight: '500',
    marginRight: 8,
    opacity: 0.9,
  },
  byContainer: {
    marginRight: 8,
  },
  by: {
    fontWeight: '500',
    opacity: 0.9,
  },
  separator: {
    marginRight: 8,
  },
  metaInfo: {
    flexDirection: 'row',
  },
  bookmark: {
    height: 36,
    width: 36,
  },
});

export default HnStoryListItem;
