import matplotlib.pyplot as plt

# Data for deposit ranges (upper bound of the range, number of accounts, and total deposit amount)
deposit_ranges = [
    (50000, 116401442, 454033),
    (100000, 4232947, 299722),
    (200000, 3414266, 473973),
    (500000, 3209242, 1017883),
    (1000000, 1623103, 1171506),
    (10000000, 1784595, 4503016),
    (25000000, 104865, 1569689),
    (50000000, 32515, 1141675),
    (100000000, 14908, 1040680),
    (200000000, 6673, 921089),
    (500000000, 3429, 1045863),
    (1000000000, 1593, 2480808)
]

# Separate the data into x (deposit range upper bound), y (number of accounts), and z (total deposit)
x = [deposit_range[0] for deposit_range in deposit_ranges]
y = [deposit_range[1] for deposit_range in deposit_ranges]
z = [deposit_range[2] for deposit_range in deposit_ranges]

# Plot the frequency curve (y-axis: frequency of accounts, x-axis: deposit amount range)
plt.figure(figsize=(10, 6))
plt.plot(x, y, marker='o', linestyle='-', color='b', label="Number of Accounts")
plt.xlabel('Deposit Amount (Baht)', fontsize=12)
plt.ylabel('Frequency of Accounts', fontsize=12)
plt.title('Frequency Curve of Bank Accounts in Thailand (2024)', fontsize=14)
plt.grid(True)
plt.xscale('log')  # Use logarithmic scale for better visualization of large numbers
plt.yscale('log')  # Use logarithmic scale for better visualization
plt.legend()
plt.show()
