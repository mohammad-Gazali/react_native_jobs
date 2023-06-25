import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
	Company,
	JobAbout,
	JobFooter,
	JobTabs,
	ScreenHeaderBtn,
	Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hooks/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
	const params = useSearchParams();
	const router = useRouter();

	const [refreshing, setRefreshing] = useState(false);
	const [activeTab, setActiveTab] = useState(tabs[0]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		refetch();
		setRefreshing(false);
	}, [])

  const displayTabsContent = () => {
    switch(activeTab) {
      case "Qualifications":
        return <Specifics title="Qualifications" points={data.job_highlights?.Qualifications ?? ["N/A"]} />
      case "About":
        return <JobAbout info={data.job_description ?? "no data provided"} />
      case "Responsibilities":
        return <Specifics title="Responsibilities" points={data.job_highlights?.Responsibilities ?? ["N/A"]} />
      default:
        break;
    }
  }

	const { data, isLoading, error, refetch } = useFetch(
		"job-details",
		params.id
	);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: COLORS.lightWhite,
					},
					headerShadowVisible: false,
					headerBackVisible: false,
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={icons.left}
							dimension="60%"
							handlePress={() => router.back()}
						/>
					),
					headerRight: () => (
						<ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
					),
					headerTitle: "",
				}}
			/>
			<>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					{isLoading ? (
						<ActivityIndicator size="large" color={COLORS.primary} />
					) : error ? (
						<Text>Something went wrong</Text>
					) : data.length === 0 ? (
						<Text>No Data</Text>
					) : (
						<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
							<Company
								companyLogo={data.employer_log}
								jobTitle={data.job_title}
								companyName={data.employer_name}
								location={data.location}
							/>
							<JobTabs
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>
              {displayTabsContent()}
						</View>
					)}
				</ScrollView>

        <JobFooter url={data.job_google_link ?? "https://careers.google.com/jobs/results"} />
			</>
		</SafeAreaView>
	);
};

export default JobDetails;
