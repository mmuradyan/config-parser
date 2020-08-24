
def isfloat(str):
    try:
        float(str)
        res = True
    except:
        res = False
    return res

def parse_config(filename):

    with open(filename) as f:
        content = f.readlines()

    true_values = ['on', 'yes', 'true']
    false_values = ['off', 'no', 'false']

    valid_list = {}

    for line in content:
        l = line.rstrip('\n')
        if l != '' and l[0] != '#' and '=' in l:

            pair = l.split('=') 
            key = pair[0].strip(' ')
            val = pair[1].strip(' ')

            if val.isnumeric():
                valid_list[key] = int(val)
                continue
            
            if isfloat(val):
                valid_list[key] = float(val)
                continue

            if val in true_values:
                valid_list[key] = True
                continue

            if val in false_values:
                valid_list[key] = False
                continue

            valid_list[key] = val
            
    return valid_list 

if __name__ == "__main__":
    CONFIG1 = parse_config('sample1.cfg')
    print(CONFIG1)

    CONFIG2 = parse_config('sample2.cfg')
    print(CONFIG2)
