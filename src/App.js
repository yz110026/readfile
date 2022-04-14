import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import DisplayData from './DisplayData';
import useAxiosFecth from './hooks/useAxiosFetch';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import Files from './Files';
import { Route, Switch } from 'react-router-dom'
import PlotLineChart from './Plots/PlotLineChart';
import PlotBarChart from './Plots/PlotBarChart';
import PlotPercentAreaChart from './Plots/PlotPercentAreaChart';
import PlotScatterChart from './Plots/PlotScatterChart';


function App() {
  const setFiles = useStoreActions((actions) => actions.setFiles);
  const files = useStoreState((state) => state.files);
  const { data, fetchError, isLoading } = useAxiosFecth('http://localhost:3500/files');
  
  useEffect(() => {
    setFiles(data);
  }, [data,setFiles]);
  console.log(files)
  return (
    <div className="App">
      <Header/>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Files
            fetchError = {fetchError}
            isLoading = {isLoading}
          />
        </Route>
        <Route path="/file/:id" component={DisplayData}/>
        <Route path="/line_chart/file/:id" component={PlotLineChart}/>
        <Route path="/bar_chart/file/:id" component={PlotBarChart}/>
        <Route path="/percent_area_chart/file/:id" component={PlotPercentAreaChart}/>
        <Route path="/scatter_chart/file/:id" component={PlotScatterChart}/>
      </Switch>
      <Footer />     
    </div>
  );
}

export default App;
