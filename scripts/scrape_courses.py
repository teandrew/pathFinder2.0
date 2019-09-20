import sys
import requests
import re
import json
import time
from urllib.parse import urlencode
from bs4 import BeautifulSoup
from google.cloud import firestore

BASE_URL = 'http://coursefinder.utoronto.ca/course-search/search/courseSearch/course/search?'
COURSE_URL = 'http://coursefinder.utoronto.ca/course-search/search/courseInquiry?methodToCall=start&viewId=CourseDetails-InquiryView&courseId='

headers = {
    'Referer': 'http://coursefinder.utoronto.ca/course-search/search/courseSearch?viewId=CourseSearch-FormView&methodToCall=start',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
}

all_courses_params = {
    'queryText': '',
    'requirements': '',
    'campusParam': 'St. George,Scarborough,Mississauga'
}

george = {
    'queryText': '',
    'requirements': '',
    'campusParam': 'St. George'
}

stc = {
    'queryText': '',
    'requirements': '',
    'campusParam': 'Scarborough'
}

mis = {
    'queryText': '',
    'requirements': '',
    'campusParam': 'Mississauga'
}


def get_site_json():
    """

    """
    url = BASE_URL + urlencode(mis)
    session = requests.session()
    try:
        session.get(url, headers=headers)
        r = session.get(url, headers=headers)
        if r.status_code == 200:
            return r.json()
        else:
            print('Error:', r.status_code)
    except requests.ConnectionError as e:
        print('Error:', e.args)
        return None


def get_course_details(url):
    """
    Use beautiful soup to parse html and get course information.
    """
    try:
        course_info = {}
        r = requests.get(url)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser')
            course_title = soup.span.text.split(': ')

            if (course_title == 'Error'):
                return None

            course_info['code'] = course_title[0]
            course_info['name'] = course_title[1]
            course_info['department'] = filter_text(
                soup.find('span', id='u41'))
            course_info['description'] = filter_text(
                soup.find('span', id='u32'))
            course_info['exclusion'] = filter_text(soup.find('span', id='u68'))
            course_info['prerequisite'] = filter_text(
                soup.find('span', id='u50'))
            course_info['institution'] = get_institution(
                filter_text(soup.find('span', id="u149")))
            course_info['ratings'] = {'average': 0, 'reviewCount': 0}
            return course_info
        else:
            print('Error:', r.status_code)
    except IndexError as e:
        print('Error:', e.args)
        return None
    except requests.ConnectionError as e:
        print('Error:', e.args)
        return None


def get_institution(campus):
    """
    Return institution shorthand based on campus location
    """
    if campus == "St. George":
        return 'utsg'
    elif campus == "Scarborough":
        return 'utsc'
    else:
        return 'utm'


def filter_text(tag):
    """
    Filter tag text by removing special characters
    """
    if tag is None:
        return ''
    else:
        return tag.text.strip('\r\n')


def main():
    start_time = time.time()
    # db = firestore.Client()

    site_data = get_site_json()

    if site_data is None:
        print('Error in getting json data')
        return

    departments = []
    courses = []
    for course_data in site_data['aaData']:
        course_link = re.search(
            'coursedetails/([a-zA-Z0-9]*)', course_data[1]).group(1)
        course_code = re.search(
            '[A-Z0-9]*[0-9]{1}[FSY]{1}', course_link).group()

        if course_code is None or course_code in courses:
            return

        full_course_url = COURSE_URL + course_link
        course_data = get_course_details(full_course_url)

        if course_data is not None:
            courses.append(course_data['code'])
            # c_ref = db.collection('courses').document(course_data['code'])
            # c_ref.set(course_data)
            dept = {
                "dept": course_data['department'],
                "inst": course_data['institution']
            }

            if dept not in departments:
                departments.append(dept)
        #         d_ref = db.collection('departments').document(
        #             dept["dept"].replace('/', ''))
        #         d_ref.set({
        #             'title': dept["dept"],
        #             'institution': dept["inst"]
        #         })

        # print(course_data['code'] + ': ' +
        #       course_data['name'] + '...................Done')
    print(departments)

    print('Done.')
    end_time = time.time()

    print("Total Elapsed time: " + str(end_time - start_time) + " sec")


if __name__ == '__main__':
    main()
