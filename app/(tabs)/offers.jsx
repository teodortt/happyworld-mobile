import { useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

import { EmptyState, SearchInput } from "../../components";
import { images } from "../../constants";
import { getOffers } from "../../lib/appwrite";
import useApi from "../../lib/useApi";

const OfferCard = ({ item }) => (
  <View className="flex-row mb-4 mx-2 bg-gray-800 border-none rounded-lg overflow-hidden">
    <Image
      source={{
        uri: `https://www.happyworld.bg${item.image.meta.download_url}`,
      }}
      className="w-36 h-36"
    />
    <View className="flex-1 p-2 pl-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold text-white">{item.position}</Text>
      </View>
      <Text className="text-sm text-gray-300">
        {item.city}, {item.state}
      </Text>
      <View className="flex-row flex-wrap items-center gap-2 mt-2">
        <Icon name="house-user" size={14} color="#888" />
        {item.featuresList?.map((feature, index) => (
          <Text
            key={index}
            className="text-xs text-white bg-white/20 px-2 py-1 rounded-md"
          >
            {feature}
          </Text>
        ))}
      </View>
      <View className="flex-row justify-between items-center mt-4">
        <Text className="text-lg font-bold text-white">
          ${item.hourly_rate}
          {item.tips_available && " + tips"}
        </Text>
        <Text className="text-xs text-red-500">
          {item.unavailable && "Sold out"}
        </Text>
      </View>
    </View>
  </View>
);

const Offers = () => {
  const { data: offers, loading, refetch } = useApi(getOffers);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Show loading spinner while fetching offers
  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Loading offers...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={offers?.items}
        // style={{ top: insets.top - 30 }}
        keyExtractor={(item) => `${item.meta.type}.${item.id}`}
        renderItem={({ item }) => <OfferCard item={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-2 space-y-6">
            <View className="flex flex-row justify-between items-center mb-6">
              <View>
                <Text className="font-medium text-sm text-gray-100">
                  Work and Travel
                </Text>
                <Text className="text-2xl font-semibold text-white">
                  Работни оферти
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-12 h-12"
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
