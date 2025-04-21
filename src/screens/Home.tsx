import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomMenu, Card, HeaderButton } from "../components";
import { useCats, useVoteCat } from "../hooks";
import { Cat } from "../types/api";
import type { CardRef } from "../components/Card";
import { Dislike, Heart } from "../icons";

export const Home = () => {
    const { data, isLoading, refetch } = useCats(20);
    const { mutate: voteCat } = useVoteCat();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [remainingCats, setRemainingCats] = useState<Cat[]>([]);
    const insets = useSafeAreaInsets();
    const cardRef = useRef<CardRef>(null);

    useEffect(() => {
        if (data && data.length > 0) {
            setRemainingCats(prev => [...prev, ...data]);
        }
    }, [data]);

    const nextCat = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        if (currentIndex >= remainingCats.length - 3) {
            refetch();
        }
    };

    const handleSwipeLeft = () => {
        nextCat();
    };

    const handleSwipeRight = (cat: Cat) => {
        voteCat({ imageId: cat.id, value: 1 });
        nextCat();
    };

    return (
        <View style={[styles.container, {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right
        }]}>
            <HeaderButton />
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {isLoading ? (
                    <ActivityIndicator color="red" size="large" />
                ) : (
                    remainingCats
                        .slice(currentIndex, currentIndex + 3)
                        .reverse()
                        .map((cat, index, array) => {
                            const isTop = index === array.length - 1;
                            return (
                                <Card
                                    key={cat.id}
                                    ref={isTop ? cardRef : null}
                                    cat={cat}
                                    onSwipeLeft={isTop ? handleSwipeLeft : () => { }}
                                    onSwipeRight={isTop ? handleSwipeRight : () => { }}
                                />
                            );
                        })
                )}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => cardRef.current?.dislike()}
                >
                    <Dislike height={32} width={32} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => cardRef.current?.like()}
                >
                    <Heart height={32} width={32} />
                </TouchableOpacity>
            </View>

            <BottomMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fa",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 20
    },
    button: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10
    }
});