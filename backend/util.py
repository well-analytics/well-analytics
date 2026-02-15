def format_dict(dataframe):
    return {
        key: dataframe[key].to_list() for key in dataframe.keys()
    }

def format_dicts(dataframes):
    new_dataframes = []
    for dataframe in dataframes:
        new_dataframes.append(format_dict(dataframe))
        
    return new_dataframes
