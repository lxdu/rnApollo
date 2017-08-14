import React, { Component } from 'react';
import { Text, ListView, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { gql, graphql } from 'react-apollo';
import formatDate from '../commons/utils';

const query = gql`
  query {
    timing: timingTrendHtmls(
      app: "wemovie"
      start: 1502294400000
      end: 1502350831000
    ) {
      app
      date
      v
      data {
        load
        dns
        redirect
        tcp
        req
        reqRes
        white
        processing
        timing
      }
    }
  }
`;

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>APP</Text>
          <Text>时间</Text>
          <Text>版本</Text>
          <Text>耗时</Text>
        </View>
        <ListView
          dataSource={ds.cloneWithRows(this.props.data.timing || [])}
          enableEmptySections
          renderRow={item =>
            <View style={styles.item}>
              <Text>
                {item.app}
              </Text>
              <Text>
                {formatDate('yyyy/MM/dd HH:mm', item.date)}
              </Text>
              <Text>
                {item.v}
              </Text>
              <Text>
                {parseInt(item.data.timing)}
              </Text>
            </View>}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  header: {
    padding: 10,
    backgroundColor:'#efefef',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default graphql(query)(List);
