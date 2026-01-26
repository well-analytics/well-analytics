from pta_learn.tpmr import *
from pta_learn.lmir import *
from pta_learn.ti_misc import *
from pta_learn.ti_workflow import *
from pta_learn.superposition_calculation import *
from pta_learn.bourdet_derivative import *
from pta_learn.normalization import *

import os
import warnings
warnings.filterwarnings('ignore')

import util

def model(pressure_series, rate_series):
    df_bhp = pd.read_csv(pressure_series)#, index_col=0)
    df_rate = pd.read_csv(rate_series)#, index_col=0)
    # change Timestamp to datetime
    df_bhp['Timestamp'] = pd.to_datetime(df_bhp['Timestamp'])
    df_rate['Timestamp'] = pd.to_datetime(df_rate['Timestamp'])
    #plot_whole(df_bhp, df_rate)
    # p is the relative pressure drop in a shut-in transient
    p = 10

    # order (int, optional): The number of adjacent points on each side of a data point to compare when identifying local minima.
    order = 100

    # interval_shutin is the minimum time duration in a shut-in transient in hours
    interval_shutin = 20

    # interval_flowing is the minimum time duration in a flowing transient in hours
    interval_flowing = 20


    shutin,flowing,TI,TI_ft,all_breakpoints,w_rate,para = ti_workflow(df_bhp, df_rate, p, interval_shutin, interval_flowing, order = order)
    #plot_target(df_bhp, df_rate, shutin, flowing)
    # shutin :
    # DataFrame containing detected shutin trnasients
    # flowing : flowing transients
    # all_breakpoints: all the breakpoints
    # w_rate: rebuilt rate based on breakpoints from all_breakpoints

    # make a list to store the loglog dataframe for any transients
    loglogs = []
    # make a list to store the rate list for any transients
    rate_lists = []
    # make a list to store the rate for any transients
    rate_targets = []
    # make a list to store the breakpoints for any transients
    bps = []
    # make a list to store the start time for any transients
    historical_times = []

    # Sel_shutin = shutin.loc[[0,1,2]].reset_index(drop=True)
    # Sel_flowing = flowing.loc[[2,3]].reset_index(drop=True)

    Sel_shutin = shutin
    Sel_flowing = flowing

    # smoothing factor for the derivative
    L = 0.1

    # calculate loglog dataframe for shut-in
    for index in range(len(Sel_shutin)):

        # Call the cal_loglog_shutin function
        log, rate_ave, all_bps = cal_loglog_shut(df_bhp, df_rate, Sel_shutin, all_breakpoints,w_rate,index, L)
        # Append all outputs to respective lists as all are validated
        loglogs.append(log)
        rate_lists.append(rate_ave)
        rate_targets.append(abs(rate_ave[find_no0_index_from_bottom(rate_ave)]))
        bps.append(all_bps)
        historical_times.append(Sel_shutin['start/hr'][index])


    # Calculate loglog dataframe for injection
    for index in range(len(Sel_flowing)):
        # Call the cal_loglog_inj function
        log, rate_ave, all_bps = cal_loglog_inj(df_bhp, df_rate, Sel_flowing, all_breakpoints,w_rate,index)
        # Append all outputs to respective lists as all are validated
        loglogs.append(log)
        rate_lists.append(rate_ave)
        rate_targets.append(abs(rate_ave[find_no0_index_from_bottom(rate_ave)]))
        bps.append(all_bps)
        historical_times.append(Sel_flowing['start/hr'][index])
        
    # sort the lists by historical time
    sorted_lists = zip(loglogs, rate_lists, rate_targets, bps, historical_times)
    sorted_lists = sorted(sorted_lists, key=lambda x: x[4])
    loglogs, rate_lists, rate_targets, bps, historical_times = zip(*sorted_lists)

    loglogs, rate_lists, rate_targets, bps, historical_times = [list(x) for x in [loglogs, rate_lists, rate_targets, bps, historical_times]]

    # set the reference transient for normalization
    ref = 0

    # normalize the derivative
    loglog_normalized = []
    for i in range(len(loglogs)):
        loglog_nor = normal_calc(loglogs[i],rate_lists[i],ref,rate_lists)
        loglog_normalized.append(loglog_nor)
    
    return {"df_bhp": util.format_dict(df_bhp), 
            "df_rate": util.format_dict(df_rate), 
            "shutin": util.format_dict(shutin), 
            "flowing": util.format_dict(flowing), 
            "loglog_normalized": util.format_dicts(loglog_normalized)}


# pressure = open("data/ti_p.csv")
# rate = open("data/ti_r.csv")
# result = model(pressure, rate)
# print(result["df_bhp"])