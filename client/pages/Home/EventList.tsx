import { View } from "react-native";
// import { CustomTheme, useCustomTheme } from "@/utils/theme";

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
        color={"rgba(0,179,131,1)"}
      ></EventItem>
      <EventItem
        date={1}
        month={"Dec"}
        time={"12:00 PM"}
        name={"Piano Heaven"}
        place={"Collin, TX"}
        color={"rgba(157,26,26,1)"}
      ></EventItem>
      <EventItem
        date={15}
        month={"Jan"}
        time={"10:30 AM"}
        name={"Big Orchestra"}
        place={"Richardson, TX"}
        color={"rgba(58,164,200,1)"}
      ></EventItem>
      <EventItem
        date={30}
        month={"Feb"}
        time={"7:00 PM"}
        name={"GDYO Fall"}
        place={"Chennai, MA"}
        color={"rgba(146,58,200,1)"}
      ></EventItem>
      <EventItem
        date={9}
        month={"March"}
        time={"7:00 PM"}
        name={"GDYO Fall"}
        place={"Denver, CO"}
        color={"rgba(255,0,0,1)"}
      ></EventItem>
      <EventItem
        date={31}
        month={"March"}
        time={"7:00 PM"}
        name={"GDYO Fall"}
        place={"Ohio, MI"}
        color={"rgba(255,140,25,1)"}
      ></EventItem>
    </View>
  );
};
