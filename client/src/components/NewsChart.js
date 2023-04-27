import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { EventTracker, HoverState } from "@devexpress/dx-react-chart";
import { Stack } from "@devexpress/dx-react-chart";

function aggregateResult(newsAnalysis) {
  var data = [];
  var pos = 0,
    neg = 0,
    neu = 0;

  newsAnalysis.map((each) => {
    switch (each.analysis) {
      case "POSITIVE": {
        pos++;
        break;
      }
      case "NEGATIVE": {
        neg++;
        break;
      }
      case "NEUTRAL": {
        neu++;
        break;
      }
      default:
        break;
    }
  });
  data = [
    { sentiment: "Positive", val: pos },
    { sentiment: "Negative", val: neg },
    { sentiment: "Neutral", val: neu },
  ];
  return data;
}

const NewsChart = (props) => {
  const RootWithTitle = (props) => (
    <div>
      {/* <span>Sentiment analysis on news articles</span> */}
      <Legend.Root {...props} />
    </div>
  );
  const Item = (props) => (
    <Legend.Item {...props} sx={{ flexDirection: "row-reverse" }} />
  );

  const Label = (props) => (
    <Legend.Label {...props} sx={{ textAlign: "right" }} />
  );

  const stacks = [{ series: ["Positive", "Negative", "Neutral"] }];
  return (
    <Paper>
      <Chart
        data={aggregateResult(props.newsAnalysis)}
        class="title"
        style={{ paddingTop: 100 }}
      >
        <PieSeries
          name="sentiment"
          valueField="val"
          argumentField="sentiment"
          innerRadius={0.6}
        />
        <Title text="Sentiment analysis on news articles" />
        <Animation />
        <EventTracker />
        <HoverState />
        <Stack stacks={stacks} />
        <Legend
          //   rootComponent={RootWithTitle}
          itemComponent={Item}
          labelComponent={Label}
        />
        <Tooltip />
      </Chart>
    </Paper>
  );
  //   }
};

export default NewsChart;
