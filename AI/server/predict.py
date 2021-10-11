# 모듈 import
import pandas as pd
import numpy as np
from pandas.core.frame import  DataFrame
from itertools import product

"""# 필요 data 읽기
data = pd.read_csv("/workspaces/APP_AI_MMIS_teamMMIS/AI/server/AI file/data.csv", encoding="UTF-8")
menu_sim_sorted_idx=np.load("/workspaces/APP_AI_MMIS_teamMMIS/AI/server/AI file/menu_sim_sorted_idx.npy")
"""
# 유사 메뉴 추천 함수

def find_sim_menu(data, menu_sim_sorted_idx, name, number=10):

    

    title_menu=data[data['메뉴이름']==name]

    title_menu_idx = title_menu.index.values

    top_sim_idx = menu_sim_sorted_idx[title_menu_idx, :number]
    
    top_sim_idx = top_sim_idx.reshape(-1,)
    similar_menu = data.iloc[top_sim_idx]['메뉴이름']

    similar_menu_list =[]
    for sim_menu in similar_menu:
        similar_menu_list.append(sim_menu)


    return similar_menu_list[1:4]

# 메뉴 점수 예측
def predictScore(menuList):
    return np.random.randint(80,100)


