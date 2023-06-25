import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Button } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './popularjobs.style';
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../../components/common/cards/popular/PopularJobCard";
import useFetch from '../../../hooks/useFetch';



const Popularjobs = () => {

  const router = useRouter();

  const { data, isLoading, error } = useFetch("search");

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item?.job_id ?? item}
            contentContainerStyle={{
              columnGap: SIZES.medium
            }}
            horizontal
            renderItem={({ item }) => (
              <PopularJobCard 
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs