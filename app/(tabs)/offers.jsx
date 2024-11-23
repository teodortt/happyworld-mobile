import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useApi from "../../lib/useApi";
import { getOffers } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

const staticPhoto =
  "https://www.happyworld.bg/media/images/tmp_nantucket-ready-8.2e16d0ba.fill-600x450.format-webp_Z1F1z3A.webp";
const staticPhoto2 =
  "https://www.happyworld.bg/media/images/35227593_197382917263.2e16d0ba.fill-600x450.format-webp.webp";
const staticPhoto3 =
  "https://www.happyworld.bg/media/images/hb.2e16d0ba.fill-600x450.format-webp.webp";
const Offers = () => {
  // const { data: offers, refetch } = useApi(getOffers);
  const offers = [
    { id: 1, position: "aa", photo: staticPhoto },
    { id: 2, position: "bb", photo: staticPhoto2 },
    { id: 3, position: "cc", photo: staticPhoto3 },
  ];
  const refetch = () => {};

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
        data={offers}
        keyExtractor={(item) => `${item.id}${item.position}`}
        renderItem={({ item }) => (
          <VideoCard
            title={item.position}
            thumbnail={item.photo}
            video={item.position}
            creator={item.id}
            avatar={item.id}
          />
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
