import { useState } from "react";

import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";

import { EmptyState, SearchInput } from "../../components";
import { images } from "../../constants";
import { getOffers } from "../../lib/appwrite";
import useApi from "../../lib/useApi";

const OfferCard = ({ item }) => (
  <View style={styles.card}>
    <Image
      source={{
        uri: `https://www.happyworld.bg${item.image.meta.download_url}`,
      }}
      style={styles.imageLeft}
    />
    <View style={styles.cardContentRight}>
      <View style={styles.cardHeader}>
        <Text style={styles.offerName}>{item.position}</Text>
      </View>
      <Text style={styles.location}>
        {item.city}, {item.state}
      </Text>
      <View style={styles.features}>
        <Icon name="house-user" size={14} color="#888" />
        {item.featuresList?.map((feature, index) => (
          <Text key={index} style={styles.feature}>
            {feature}
          </Text>
        ))}
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          ${item.hourly_rate}
          {item.tips_available && " + tips"}
        </Text>
        <Text style={styles.availability}>
          {item.unavailable && "Sold out"}
        </Text>
      </View>
    </View>
  </View>
);

const Offers = () => {
  const { data: offers, refetch } = useApi(getOffers);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={offers?.items}
        keyExtractor={(item) => `${item.meta.type}.${item.id}`}
        renderItem={
          ({ item }) => <OfferCard item={item} />
          // <VideoCard
          //   title={item.title}
          //   thumbnail={item.thumbnail}
          //   video={item.video}
          //   creator={item.creator.username}
          //   avatar={item.creator.avatar}
          // />
        }
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

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // Align image and content horizontally
    marginBottom: 16,
    borderRadius: 8, // Rounded corners
    borderWidth: 1, // Add a white border
    borderColor: "#fff", // White border color
    overflow: "hidden",
  },
  imageLeft: {
    width: 140, // Fixed width for the image
    height: 140, // Fixed height for uniformity
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContentRight: {
    flex: 1, // Fill remaining space
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  offerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White text
    flexShrink: 1, // Prevent text overflow
  },
  location: {
    fontSize: 14,
    color: "#fff", // White text
    marginVertical: 4,
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  feature: {
    fontSize: 12,
    color: "#fff", // White text
    marginRight: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white background
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  rating: {
    fontSize: 16,
    color: "#fff", // White text
    fontWeight: "bold",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: "#fff", // White text
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)", // Light white for strikethrough price
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White text
  },
  availability: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)", // Light white
    marginLeft: 8,
  },
});

export default Offers;
