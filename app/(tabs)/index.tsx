import { Text, View, Image, Button } from "react-native";

export default function Index() {
  return (
    <View>
      <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20
      }}
    >
      <Image 
        source={require('./head.jpg')} 
        style={{ width: 100, height: 100, borderRadius: 50 }}
        resizeMethod="scale"
      />
    </View>
    <View
      style={{
        flex: 2,
        justifyContent: "center",
        flexDirection:"column",
        alignItems: "center",
        margin: 20,
        gap:10,
        padding: 20,
      }}
    >
      <Text>Name</Text>
      <Text>Email</Text>
      <Text>Phone</Text>
      <Text>Address</Text>
      <Text>Birthday</Text>
    </View>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"row",
        margin: 20,
        gap:10
      }}
    >
      <Button title={'Edit'}/>
      <Button title={'Settings'}/>
      <Button title={'Logout'}/>
    </View>
    </View>
  );
}
