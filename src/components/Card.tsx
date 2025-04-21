import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, PanResponder, ImageBackground } from 'react-native';
import { Cat } from '../types/api';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 120;

interface Props {
    cat: Cat;
    onSwipeLeft: () => void;
    onSwipeRight: (cat: Cat) => void;
  }
  
  export interface CardRef {
    like: () => void;
    dislike: () => void;
  }

  export const Card = forwardRef<CardRef, Props>(({ cat, onSwipeLeft, onSwipeRight }, ref) => {

  const position = useRef(new Animated.ValueXY()).current;
  
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  const scale = useRef(new Animated.Value(1)).current;
  
  const cardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate },
      { scale }
    ]
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.spring(scale, {
        toValue: 1.05,
        friction: 5,
        useNativeDriver: false
      }).start();
    },
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: false
      }).start();
      
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe('right');
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe('left');
      } else {
        resetPosition();
      }
    }
  });

  const forceSwipe = (direction: 'left' | 'right') => {
    const x = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 300,
      useNativeDriver: false
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      onSwipeRight(cat);
    } else {
      onSwipeLeft();
    }
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      tension: 40,
      useNativeDriver: false
    }).start();
  };

  const handleLikePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
      })
    ]).start(() => {
      forceSwipe('right');
    });
  };

  const handleDislikePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
      })
    ]).start(() => {
      forceSwipe('left');
    });
  };

  useImperativeHandle(ref, () => ({
    like: handleLikePress,
    dislike: handleDislikePress,
  }));

  const breed = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null;

  return (
    <Animated.View 
      style={[styles.cardContainer, cardStyle]} 
      {...panResponder.panHandlers}
    >
      
      <ImageBackground 
        source={{ uri: cat.url }} 
        style={styles.image} 
        resizeMode="cover"
      >
        <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{breed ? breed.name : 'Mystery Cat'}</Text>
          <Text style={styles.rating}>{2}</Text>
        </View>
        {breed && breed.origin && (
            <Text style={styles.origin}>{breed.origin}</Text>
          )}
      </View>
      </ImageBackground>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  infoContainer: {
    padding: 12,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '90%',
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  origin: {
    fontSize: 14,
    color: '#999',
    marginTop: 2
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  likeText: {
    borderWidth: 5,
    borderColor: '#4CD964',
    color: '#4CD964',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10
  },
  dislikeText: {
    borderWidth: 5,
    borderColor: '#FF3B30',
    color: '#FF3B30',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10
  },
});
