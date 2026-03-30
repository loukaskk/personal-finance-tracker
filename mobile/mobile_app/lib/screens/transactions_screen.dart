import 'package:flutter/material.dart';
import 'widgets/balance_card.dart';
class TransactionsScreen extends StatelessWidget {
  const TransactionsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Transactions'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const BalanceCard(),
            const SizedBox(height: 20),
            const Text(
              'Recent Transactions',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: ListView(
                children: const [
                  ListTile(
                    leading: CircleAvatar(child: Icon(Icons.shopping_bag)),
                    title: Text('Groceries'),
                    subtitle: Text('Expense'),
                    trailing: Text('€50'),
                  ),
                  ListTile(
                    leading: CircleAvatar(child: Icon(Icons.directions_bus)),
                    title: Text('Transport'),
                    subtitle: Text('Expense'),
                    trailing: Text('€20'),
                  ),
                  ListTile(
                    leading: CircleAvatar(child: Icon(Icons.attach_money)),
                    title: Text('Salary'),
                    subtitle: Text('Income'),
                    trailing: Text('€1500'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add),
      ),
    );
  }
}