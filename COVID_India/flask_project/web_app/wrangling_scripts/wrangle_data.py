import pandas as pd
import plotly.graph_objs as go
import plotly.express as px
df_testing=pd.read_csv('data/StatewiseTestingDetails.csv')
df_cases=pd.read_csv('data/covid_19_india.csv')
world_time_series=pd.read_csv('data/johns-hopkins-covid-19-daily-dashboard-cases-over-time.csv')[['country_region','last_update','confirmed','iso3']].dropna()
dates=world_time_series['last_update'].unique().tolist()
countries=world_time_series['country_region'].unique().tolist()
custom_df   =pd.read_csv('data/output.csv')
# custom_df=pd.DataFrame(columns=['date','country','iso3','cases','hovertext'])
# ind=0
# for date in dates:
#     for country in countries:
#         row_=world_time_series.query('country_region==@country and last_update==@date')
#         d={}
#         if country=='US':
#             #print(date,country,'USA',":",row_['confirmed'].sum())
#             cases=int(max(row_['confirmed']))
#             text_=str(country)+":"+str(cases)
#             d = {'date': date, 'country': country,'iso3':'USA','cases':cases,'hovertext':text_}
#         else:
#             #print(date,country,row_['iso3'],row_['confirmed'])
#             cases=int(row_['confirmed'].values[0])
#             text_=str(country)+":"+str(cases)
#             d = {'date': date, 'country': country,'iso3':row_['iso3'].values[0],'cases':cases,'hovertext':text_}
        
#         custom_df.at[ind, :] = d
#         ind+=1
my_frames=[]
names=[]
durations=[]
transitions= []
sliderSteps=[]
# make frames
for date in dates:
    names.append(str(date))
    durations.append(dict(duration=30))
    transitions.append(dict(duration=30,easing='elastic-in'))
    frame = {"data": [], "name": str(date)}
    dataset_by_date = custom_df[custom_df["date"] == date]
        
    frame['data'].append(dict(
            type= 'scattergeo',
            locations = dataset_by_date['iso3'].tolist(),
            mode = 'markers',
            text=dataset_by_date['hovertext'].tolist(),
            
            marker=dict(
                opacity=0.5,
                sizemode='area',
                size=dataset_by_date['cases'].tolist(),
                sizeref =  max(dataset_by_date['cases']) / (50. ** 2),
                sizemin=2
            )
            
    ))

    sliderSteps.append(dict(
      method= 'animate',
      label= str(date),
      args= [[str(date)], dict(
        mode= 'immediate',
        transition= {'duration': 300},
        frame= {'duration': 300, 'redraw': 0},
      )]
    ))
    my_frames.append(frame)

def return_counts():
    df_cases=pd.read_csv('data/covid_19_india.csv')
    latest_counts=df_cases[df_cases['Date']=="11/06/20"][['Date','State/UnionTerritory','Cured','Deaths','Confirmed']].sort_values(['Cured','Deaths','Confirmed'], ascending=[False, False, False])
    latest_counts=latest_counts.rename(columns={"State/UnionTerritory":"States"})
    return (latest_counts.head())

def return_testsdata():
    states_and_ut=df_testing['State'].unique().tolist()
    fig_states_testing = []
    for state in states_and_ut:
        fig_states_testing.append(dict(      
            x = df_testing[df_testing['State']==state]['Date'].tolist(),
            y = df_testing[df_testing['State']==state]['TotalSamples'].tolist(),
            mode='lines',
            name=state,
            connectgaps=1,
              )) 
    #df_cases['Date']=pd.to_datetime(df_cases['Date'], format= '%d/%m/%y')
    states_and_ut_cases=df_cases['State/UnionTerritory'].unique().tolist()
    fig_confirmed_cases=[]

    for state in states_and_ut_cases:
      if state != 'Cases being reassigned to states' and state != 'Unassigned':
          fig_confirmed_cases.append(dict(      
              x = df_cases[df_cases['State/UnionTerritory']==state]['Date'].tolist(),
              y = df_cases[df_cases['State/UnionTerritory']==state]['Confirmed'].tolist(),
              mode='lines',
              name=state,
              connectgaps=1,
                ))
    return {"tests":fig_states_testing,"cases":fig_confirmed_cases}

def return_agegroups():
    patients=pd.read_csv('data/IndividualDetails.csv')
    s = patients[patients['age'] != ('28-35' or 'NAN')]['age'].astype(float)
    age_groups=pd.cut(s, [0,10,20,30,40,50,60,70,80,90,100], labels=['0-10','11-20','21-30','31-40','41-50','51-60','61-70','71-80','81-90','>91']).value_counts().rename_axis('Age Groups').to_frame('Cases')

    fig_ages = [dict(
            x = age_groups.index.tolist(),
            y = age_groups.Cases.tolist(),
            text=age_groups.Cases.tolist(),
            textposition='outside',
            hovertemplate='Ages:%{x}<extra></extra> ',
            type="bar"
    )]
    fig_ages_layout=dict(
        title_text="Confirmed Cases in Different Age groups.",
        yaxis=dict(
            title='Cases'
        )
        ,xaxis=dict(
            title='Age Groups'
        ))
    return {"chart":fig_ages,"layout":fig_ages_layout}

def return_hosp():
    patients=pd.read_csv('data/IndividualDetails.csv')
    
    HospitalBedsIndia=pd.read_csv('data/HospitalBedsIndia.csv')
    patients=patients.rename(columns={"detected_state":"State/UT"})

    HospitalBedsIndia.at[0,'State/UT']="Andaman and Nicobar Islands"

    HospitalBedsIndia['total_beds']=HospitalBedsIndia['NumUrbanBeds_NHP18']+HospitalBedsIndia['NumRuralBeds_NHP18']+HospitalBedsIndia['NumPublicBeds_HMIS']

    df_beds=HospitalBedsIndia[['State/UT','total_beds']]

    df_pateints_sw=patients[patients['current_status']=='Hospitalized']['State/UT'].value_counts().rename_axis('State/UT').to_frame('counts')

    result = pd.merge(df_beds, df_pateints_sw,on='State/UT')

    fig_beds = []
    fig_beds.append(dict(x=result['State/UT'].tolist(),
                    y=result['total_beds'].tolist(),
                    name='Total beds',
                    marker_color='rgb(55, 83, 109)',
                    mode='markers',
                    ))
    fig_beds.append(dict(x=result['State/UT'].tolist(),
                    y=result['counts'].tolist(),
                    name='Hospitalized',
                    marker_color='rgb(26, 118, 255)',
                    mode='markers',
                    ))
    fig_beds_layout=dict(
        yaxis=dict(
            title=''
        )
        ,xaxis=dict(
            title='States'
        ),
        hovermode = 'x')
    return {"chart":fig_beds,"layout":fig_beds_layout}

def return_worldmap():


    try1=custom_df.query('date=="2020-01-22"')
   

    fig_world = [dict(
            type= 'scattergeo',
            locations = try1['iso3'].tolist(),
            mode = 'markers',
            text=try1['hovertext'].tolist(),
            
            marker=dict(
                opacity=0.5,
                sizemode='area',
                size=try1['cases'].tolist(),
                sizeref =  max(try1['cases']) / (50. ** 2),
                sizemin=2,
            ),
            
    )]
    
    fig_world_animate=dict(
    frame= durations,
    transition= transitions,
    mode= 'afterall')
  
   

    return {"chart":fig_world,"framedata":my_frames,"sliderSteps":sliderSteps,"names":names,"fig_world_animate":fig_world_animate}






  
    
  
    