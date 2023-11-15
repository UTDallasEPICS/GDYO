import { View } from "react-native";
// import { CustomTheme, useCustomTheme } from "utils/theme";

import { EventItem } from "./EventItem";
export const EventList = () => {
  return (
    <View style={{ width: "100%" }}>
      <EventItem
        date={18}
        month={"Nov"}
        time={"8:00 AM"}
        name={"GDYO Season Opener"}
        place={"Moody Orchestra Hall"}
        color={"red"}
      ></EventItem>
      <EventItem
        date={1}
        month={"Dec"}
        time={"12:00 PM"}
        name={"Piano Heaven"}
        place={"Collin, TX"}
        color={"green"}
      ></EventItem>
      <EventItem
        date={15}
        month={"Jan"}
        time={"10:30 AM"}
        name={"Big Orchestra"}
        place={"Richardson, TX"}
        color={"yellow"}
      ></EventItem>
      <EventItem
        date={30}
        month={"Feb"}
        time={"7:00 PM"}
        name={"GDYO Fall"}
        place={"Denver, CO"}
        color={"blue"}
      ></EventItem>
    </View>
  );
};
