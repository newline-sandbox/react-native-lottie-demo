/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HnStoryListItem from './src/components/HnStoryListItem';

const App = () => {
  const [hnStories, setHnStories] = useState<HnStory[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<{[key: string]: boolean}>({});

  const fetchHnStories = async () => {
    try {
      const ids: string[] = await (
        await fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
      ).json();

      const stories: HnStory[] = await Promise.all(
        ids
          .slice(0, 10)
          .map(
            async (id: string) =>
              await (
                await fetch(
                  `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
                )
              ).json(),
          ),
      );

      setHnStories(
        stories.map(story => ({
          ...story,
          id: String(story.id), // `keyExtractor` requires a stringified ID value.
        })),
      );
    } catch (err) {
      console.error(err);

      setFetchError(
        'Uh Oh! Something went wrong with the Hacker News API. Please restart the application.',
      );
    }
  };

  useEffect(() => {
    fetchHnStories();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      {hnStories.length > 0 ? (
        <FlatList
          data={hnStories}
          renderItem={({item}) => (
            <HnStoryListItem
              story={item}
              onPress={() =>
                Linking.openURL(
                  `https://news.ycombinator.com/item?id=${item.id}`,
                )
              }
              onBookmarkChange={id => {
                setBookmarks({
                  ...bookmarks,
                  [id]: !bookmarks[id],
                });
              }}
              isBookmarked={bookmarks[item.id]}
            />
          )}
          ItemSeparatorComponent={() => <View style={[styles.separator]} />}
          keyExtractor={item => item.id}
          ListFooterComponent={<View style={[styles.listFooterSpacing]} />}
        />
      ) : null}
      <View>
        {fetchError ? (
          <Text style={[styles.fetchErrorMessage]}>{fetchError}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fetchErrorMessage: {
    fontSize: 16,
  },
  separator: {
    height: 2,
    flex: 1,
    backgroundColor: '#e6ecf0',
  },
  listFooterSpacing: {
    flex: 1,
    marginBottom: 60,
  },
});

export default App;
