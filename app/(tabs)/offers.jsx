import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useApi from "../../lib/useApi";
import { getOffers } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

const Offers = () => {
  const { data: offers, refetch } = useApi(getOffers);
  const [refreshing, setRefreshing] = useState(false);

  const extractedData = offers?.results?.map((r) => {
    const [position, place] = r.title?.split(" - ") || [];
    return { id: r.id, position, place };
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={extractedData}
        keyExtractor={(item) => `${item.id}${item.position}`}
        renderItem={({ item }) => (
          <View className="flex-row">
            <View>
              <Text className="text-orange-500">{item.position}</Text>
            </View>
            <View>
              <Text className="text-orange-500">{item.location}</Text>
            </View>
          </View>
          // <VideoCard
          //   title={item.title}
          //   thumbnail={item.thumbnail}
          //   video={item.video}
          //   creator={item.creator.username}
          //   avatar={item.creator.avatar}
          // />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Work and Travel
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Работни оферти
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-12 h-11"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Няма налични оферти за тази категория"
            subtitle="Няма намерени оферти"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="Refreshing..."
            tintColor="#fff"
            titleColor="#fff"
          />
        }
      />
    </SafeAreaView>
  );
};

export default Offers;
