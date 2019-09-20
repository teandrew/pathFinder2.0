from google.cloud import firestore

if __name__ == "__main__":
    db = firestore.Client()

    courses_ref = db.collection(u'courses')
    docs = courses_ref.get()
    courses_list = []
    print('Getting course codes')
    for course in docs:
        c = course.to_dict()
        courses_list.append(c['code'])

    print("Updating " + str(len(courses_list)) + " courses...")

    for course in courses_list:
        c_ref = db.collection(u'courses').document(course)
        c_ref.update({
            'ratings': {
                'average': 0,
                'reviewCount': 0
                }
            })

    print('Finished...')
