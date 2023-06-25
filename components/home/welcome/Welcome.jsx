import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";



const jobsTypes = ["Full-time", "Part-time", "Freelance", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
	const [activeJobType, setActiveJobType] = useState(jobsTypes[0]);
	const router = useRouter();

	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.userName}>Hello Gazali</Text>
				<Text style={styles.welcomeMessage}>Find your perfect job</Text>
			</View>
			<View style={styles.searchContainer}>
				<View style={styles.searchWrapper}>
					<TextInput
						style={styles.searchInput}
						value={searchTerm}
						onChangeText={text => { setSearchTerm(text) }}
						placeholder="What are your looking for ?"
					/>
				</View>
				<TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
					<Image
						source={icons.search}
						resizeMode="contain"
						style={styles.searchBtnImage}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.tabsContainer}>
				<FlatList
					data={jobsTypes}
					// key extractor is similar to key prop that we use with normal react
					keyExtractor={(item) => item}
					contentContainerStyle={{
						columnGap: SIZES.small,
					}}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								style={styles.tab(activeJobType, item)}
								onPress={() => {
									setActiveJobType(item);
								}}
							>
								<Text style={styles.tabText(activeJobType, item)}>{item}</Text>
							</TouchableOpacity>
						);
					}}
					// horizontal property is for making the flat list items appear horizontally
					horizontal
				/>
			</View>
		</View>
	);
};

export default Welcome;
